from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse
import os
import sqlite3
import uuid
import json
from datetime import datetime

router = APIRouter()

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "uploads"))
DB_PATH = os.path.join(UPLOAD_DIR, "history.db")

# Ensure upload dir exists
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Init DB
with sqlite3.connect(DB_PATH) as conn:
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS predictions (
            id TEXT PRIMARY KEY,
            filename TEXT,
            car_model TEXT,
            predicted_cost REAL,
            manual_cost REAL,
            breakdown_json TEXT,
            img_parts_path TEXT,
            img_severity_path TEXT,
            timestamp TEXT
        )
        """
    )
    conn.commit()

# === Save prediction ===
@router.post("/upload")
async def save_prediction(
    car_model: str = Form(...),
    predicted_cost: float = Form(...),
    manual_cost: float = Form(...),
    breakdown_json: str = Form(...),
    img_parts: UploadFile = File(...),
    img_severity: UploadFile = File(...)
):
    pred_id = str(uuid.uuid4())
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    parts_path = os.path.join(UPLOAD_DIR, f"{pred_id}_parts.png")
    severity_path = os.path.join(UPLOAD_DIR, f"{pred_id}_severity.png")

    try:
        # Save images
        with open(parts_path, "wb") as f:
            f.write(await img_parts.read())
        with open(severity_path, "wb") as f:
            f.write(await img_severity.read())

        # Insert metadata
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO predictions (
                    id, filename, car_model, predicted_cost, manual_cost,
                    breakdown_json, img_parts_path, img_severity_path, timestamp
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    pred_id,
                    img_parts.filename,
                    car_model,
                    predicted_cost,
                    manual_cost,
                    breakdown_json,
                    parts_path,
                    severity_path,
                    timestamp
                )
            )
            conn.commit()

        return {"message": "Prediction saved", "id": pred_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# === Fetch all predictions ===
@router.get("/")
def get_history():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute(
                """
                SELECT
                    id,
                    car_model,
                    predicted_cost,
                    manual_cost,
                    img_parts_path,
                    img_severity_path,
                    timestamp
                FROM predictions
                ORDER BY timestamp DESC
                """
            )
            rows = cursor.fetchall()

        result = []
        seen = set()
        for (
            prediction_id,
            model,
            pred_cost,
            man_cost,
            parts_path,
            severity_path,
            ts
        ) in rows:
            key = (model, ts, pred_cost)
            if key in seen:
                continue
            seen.add(key)
            result.append({
                "id": prediction_id,
                "car_model": model,
                "predicted_cost": int(pred_cost),
                "manual_cost": int(man_cost),
                "timestamp": ts,
                "part_image_url": f"/uploads/{os.path.basename(parts_path)}",
                "severity_image_url": f"/uploads/{os.path.basename(severity_path)}",
            })

        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/severity-distribution")
def get_severity_distribution():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT breakdown_json FROM predictions")
            rows = cursor.fetchall()

        severity_counts = {"Minor": 0, "Moderate": 0, "Severe": 0}

        for row in rows:
            try:
                breakdown = json.loads(row["breakdown_json"])
                if isinstance(breakdown, list):
                    for item in breakdown:
                        severity = item.get("severity", "").lower()
                        if severity == "minor":
                            severity_counts["Minor"] += 1
                        elif severity == "moderate":
                            severity_counts["Moderate"] += 1
                        elif severity == "severe":
                            severity_counts["Severe"] += 1
            except Exception:
                continue

        return [
            {"name": "Minor", "value": severity_counts["Minor"]},
            {"name": "Moderate", "value": severity_counts["Moderate"]},
            {"name": "Severe", "value": severity_counts["Severe"]},
        ]
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@router.get("/dashboard-overview")
def dashboard_overview():
    try:
        today = datetime.now().strftime("%Y-%m-%d")

        # === For Predictions ===
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()

            cursor.execute("SELECT COUNT(*) FROM predictions WHERE DATE(timestamp) = ?", (today,))
            ai_claims_today = cursor.fetchone()[0]

            cursor.execute("SELECT SUM(predicted_cost) FROM predictions WHERE DATE(timestamp) = ?", (today,))
            ai_total_cost = cursor.fetchone()[0] or 0

            cursor.execute("SELECT breakdown_json FROM predictions")
            damage_rows = cursor.fetchall()

        damage_counter = {}
        severity_counter = {"minor": 0, "moderate": 0, "severe": 0}

        for row in damage_rows:
            try:
                breakdown_list = json.loads(row["breakdown_json"])
            except:
                continue
            if isinstance(breakdown_list, list):
                for item in breakdown_list:
                    part = item.get("part")
                    severity = item.get("severity")
                    if part:
                        damage_counter[part] = damage_counter.get(part, 0) + 1
                    if severity:
                        severity_counter[severity.lower()] += 1

        top_part = max(damage_counter, key=damage_counter.get) if damage_counter else None
        top_severity = max(severity_counter, key=severity_counter.get) if any(severity_counter.values()) else None

        manual_claims_today = 0
        manual_claims_cost_today = 0
        manual_db_path = os.path.join(BASE_DIR, "history.db")
        with sqlite3.connect(manual_db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM claims WHERE DATE(date_time) = ?", (today,))
            manual_claims_today = cursor.fetchone()[0]

            cursor.execute("SELECT SUM(claim_paid_amount) FROM claims WHERE DATE(date_time) = ?", (today,))
            manual_claims_cost_today = cursor.fetchone()[0] or 0

        total_claims_today = ai_claims_today + manual_claims_today
        total_repair_cost_today = ai_total_cost + manual_claims_cost_today

        return {
            "claimsToday": total_claims_today,
            "topPart": top_part,
            "topSeverity": top_severity.capitalize() if top_severity else None,
            "repairCostToday": int(total_repair_cost_today)
        }
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

PART_CLASSES = [
    'car', 'RunningBoard-Dent', 'Sidemirror-Damage', 'damaged-head-light',
    'damaged-hood', 'damaged_bumper', 'damaged_door', 'damaged_fender',
    'damaged_trunk', 'missing_grille', 'shattered-glass'
]

@router.get("/damage-parts-over-time")
def damage_parts_over_time():
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT timestamp, breakdown_json FROM predictions")
            rows = cursor.fetchall()

        from collections import defaultdict, Counter
        daily_counts = defaultdict(lambda: defaultdict(int))
        total_counts = Counter()

        for row in rows:
            try:
                date_raw = row["timestamp"]
                date_str = date_raw[:10] if isinstance(date_raw, str) else str(date_raw)

                breakdown = json.loads(row["breakdown_json"])
                if isinstance(breakdown, list):
                    for item in breakdown:
                        part = item.get("part")
                        if part in PART_CLASSES:
                            daily_counts[date_str][part] += 1
                            total_counts[part] += 1
            except Exception as inner_err:
                print("⚠ Skipping row due to error:", inner_err)
                continue

        top_parts = [part for part, _ in total_counts.most_common(5)]

        result = []
        for date in sorted(daily_counts.keys()):
            entry = {"date": date}
            for part in top_parts:
                entry[part] = daily_counts[date].get(part, 0)
            result.append(entry)

        return result

    except Exception as e:
        print(" ERROR in damage_parts_over_time:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})
