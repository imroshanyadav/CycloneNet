"""
Service layer for the three ML tasks: Identification, Classification, Prediction

Each task has a separate function that processes satellite imagery:
1. Identification: Detects if cyclone is present and locates center
2. Classification: Identifies structural pattern given center location
3. Prediction: Forecasts future position and pattern from sequence
"""
from __future__ import annotations

import logging
from typing import Any, BinaryIO, List
import numpy as np
from datetime import datetime, timezone

from app.services.intensity_service import preprocess_image

logger = logging.getLogger(__name__)


# Structural patterns used across all tasks
STRUCTURAL_PATTERNS = [
    "eye",                  # Clear eye formation
    "spiral_banding",       # Well-defined spiral bands
    "curved_band",          # Curved band structure
    "shear_affected",       # Asymmetric due to wind shear
    "disorganized",         # Poorly organized, no clear structure
]


# ============================================================================
# Task 1: Identification
# ============================================================================

def run_identification(image_data: bytes | BinaryIO) -> dict[str, Any]:
    """
    Task 1: Cyclone Identification
    
    Detects if a cyclone is present and locates its center.
    
    Parameters
    ----------
    image_data : bytes or file-like
        Satellite image data
        
    Returns
    -------
    dict
        {
            "is_cyclone_present": bool,
            "confidence": float,
            "center": {"lat": float, "lon": float} or None,
            "model": {"name": str, "version": str, "architecture": str}
        }
    """
    try:
        # Preprocess image
        img_array = preprocess_image(image_data)
        logger.info(f"[IDENTIFICATION] Processing image shape: {img_array.shape}")
        
        # Try to load real model
        try:
            from app.services.ml_models import identify_cyclone
            result = identify_cyclone(img_array)
            logger.info("[IDENTIFICATION] Using real detection model")
            return result
        except ImportError:
            logger.warning("[IDENTIFICATION] Real model not available, using stub")
            return _stub_identification(img_array)
            
    except Exception as e:
        logger.error(f"Identification failed: {e}")
        raise


def _stub_identification(img_array: np.ndarray) -> dict[str, Any]:
    """Stub implementation for identification."""
    # Analyze image to determine if it looks like a cyclone
    mean_intensity = float(np.mean(img_array))
    std_intensity = float(np.std(img_array))
    
    # High contrast and organized structure suggests cyclone
    is_cyclone = std_intensity > 0.12  # Threshold for structure
    confidence = min(0.65 + std_intensity * 2.0, 0.98)
    
    if is_cyclone:
        # Estimate center based on image properties
        # In real model, this would use CNN attention/detection
        center_lat = 15.0 + (mean_intensity - 0.5) * 10.0
        center_lon = 68.0 + (std_intensity - 0.15) * 20.0
        
        return {
            "is_cyclone_present": True,
            "confidence": round(confidence, 3),
            "center": {
                "lat": round(center_lat, 2),
                "lon": round(center_lon, 2),
            },
            "model": {
                "name": "cyclone-detector-stub",
                "version": "0.1.0",
                "architecture": "ResNet50-based"
            }
        }
    else:
        return {
            "is_cyclone_present": False,
            "confidence": round(1.0 - confidence, 3),
            "center": None,
            "model": {
                "name": "cyclone-detector-stub",
                "version": "0.1.0",
                "architecture": "ResNet50-based"
            }
        }


# ============================================================================
# Task 2: Classification
# ============================================================================

def run_classification(
    image_data: bytes | BinaryIO,
    center_lat: float,
    center_lon: float
) -> dict[str, Any]:
    """
    Task 2: Cyclone Classification
    
    Classifies structural pattern given known center location.
    
    Parameters
    ----------
    image_data : bytes or file-like
        Satellite image data
    center_lat : float
        Known cyclone center latitude
    center_lon : float
        Known cyclone center longitude
        
    Returns
    -------
    dict
        {
            "center": {"lat": float, "lon": float},
            "structural_pattern": {"pattern": str, "confidence": float},
            "model": {"name": str, "version": str, "architecture": str}
        }
    """
    try:
        # Preprocess image
        img_array = preprocess_image(image_data)
        logger.info(f"[CLASSIFICATION] Processing at center ({center_lat}, {center_lon})")
        
        # Try to load real model
        try:
            from app.services.ml_models import classify_pattern
            result = classify_pattern(img_array, center_lat, center_lon)
            logger.info("[CLASSIFICATION] Using real classification model")
            return result
        except ImportError:
            logger.warning("[CLASSIFICATION] Real model not available, using stub")
            return _stub_classification(img_array, center_lat, center_lon)
            
    except Exception as e:
        logger.error(f"Classification failed: {e}")
        raise


def _stub_classification(
    img_array: np.ndarray,
    center_lat: float,
    center_lon: float
) -> dict[str, Any]:
    """Stub implementation for classification."""
    # Analyze image structure
    mean_intensity = float(np.mean(img_array))
    std_intensity = float(np.std(img_array))
    
    # Classify based on image properties
    # In real model, this would focus on center region
    if std_intensity > 0.20:
        pattern = "eye"
        confidence = 0.85 + std_intensity * 0.5
    elif std_intensity > 0.16:
        pattern = "spiral_banding"
        confidence = 0.78 + std_intensity * 0.4
    elif std_intensity > 0.13:
        pattern = "curved_band"
        confidence = 0.72 + std_intensity * 0.3
    elif std_intensity > 0.10:
        pattern = "shear_affected"
        confidence = 0.68 + std_intensity * 0.2
    else:
        pattern = "disorganized"
        confidence = 0.65
    
    confidence = min(confidence, 0.95)
    
    return {
        "center": {
            "lat": center_lat,
            "lon": center_lon,
        },
        "structural_pattern": {
            "pattern": pattern,
            "confidence": round(confidence, 3),
        },
        "model": {
            "name": "cyclone-classifier-stub",
            "version": "0.1.0",
            "architecture": "ResNet34-based"
        }
    }


# ============================================================================
# Task 3: Prediction
# ============================================================================

def run_prediction(
    image_sequence: List[bytes | BinaryIO],
    timestamps: List[str]
) -> dict[str, Any]:
    """
    Task 3: Cyclone Prediction
    
    Predicts future center and pattern from past frame sequence.
    
    Parameters
    ----------
    image_sequence : list
        List of satellite images (T-12h → T0)
    timestamps : list
        ISO 8601 timestamps for each frame
        
    Returns
    -------
    dict
        {
            "input_sequence_length": int,
            "current_time": str,
            "predictions": [
                {
                    "horizon_hours": 12,
                    "center": {"lat": float, "lon": float},
                    "structural_pattern": {"pattern": str, "confidence": float},
                    "uncertainty": {"sigma_lat": float, "sigma_lon": float}
                },
                ...
            ],
            "model": {"name": str, "version": str, "architecture": str}
        }
    """
    try:
        # Preprocess all images in sequence
        sequence_arrays = [preprocess_image(img) for img in image_sequence]
        
        # Stack into [T, C, H, W] tensor
        sequence_tensor = np.concatenate(sequence_arrays, axis=0)
        logger.info(f"[PREDICTION] Processing sequence shape: {sequence_tensor.shape}")
        logger.info(f"[PREDICTION] Time range: {timestamps[0]} → {timestamps[-1]}")
        
        # Try to load real model
        try:
            from app.services.ml_models import predict_trajectory
            result = predict_trajectory(sequence_tensor, timestamps)
            logger.info("[PREDICTION] Using real prediction model")
            return result
        except ImportError:
            logger.warning("[PREDICTION] Real model not available, using stub")
            return _stub_prediction(sequence_tensor, timestamps)
            
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise


def _stub_prediction(
    sequence_tensor: np.ndarray,
    timestamps: List[str]
) -> dict[str, Any]:
    """Stub implementation for prediction."""
    # Analyze sequence trend
    mean_intensities = [float(np.mean(frame)) for frame in sequence_tensor]
    std_intensities = [float(np.std(frame)) for frame in sequence_tensor]
    
    # Estimate movement trend
    mean_trend = mean_intensities[-1] - mean_intensities[0]
    std_trend = std_intensities[-1] - std_intensities[0]
    
    # Base position from last frame
    base_lat = 15.0 + mean_intensities[-1] * 10.0
    base_lon = 68.0 + std_intensities[-1] * 20.0
    
    # T+12h prediction
    pred_12h_lat = base_lat + mean_trend * 5.0 + 0.8
    pred_12h_lon = base_lon + std_trend * 3.0 - 0.5
    pattern_12h = "eye" if std_intensities[-1] > 0.18 else "spiral_banding"
    
    # T+24h prediction
    pred_24h_lat = base_lat + mean_trend * 10.0 + 1.8
    pred_24h_lon = base_lon + std_trend * 6.0 - 1.2
    pattern_24h = "spiral_banding" if std_intensities[-1] > 0.15 else "curved_band"
    
    return {
        "input_sequence_length": len(timestamps),
        "current_time": timestamps[-1],
        "predictions": [
            {
                "horizon_hours": 12,
                "center": {
                    "lat": round(pred_12h_lat, 2),
                    "lon": round(pred_12h_lon, 2),
                },
                "structural_pattern": {
                    "pattern": pattern_12h,
                    "confidence": 0.82,
                },
                "uncertainty": {
                    "sigma_lat": 0.5,
                    "sigma_lon": 0.5,
                }
            },
            {
                "horizon_hours": 24,
                "center": {
                    "lat": round(pred_24h_lat, 2),
                    "lon": round(pred_24h_lon, 2),
                },
                "structural_pattern": {
                    "pattern": pattern_24h,
                    "confidence": 0.74,
                },
                "uncertainty": {
                    "sigma_lat": 0.8,
                    "sigma_lon": 0.8,
                }
            }
        ],
        "model": {
            "name": "cyclone-predictor-stub",
            "version": "0.1.0",
            "architecture": "ConvLSTM-based"
        }
    }
