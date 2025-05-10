FROM python:3.10-slim

WORKDIR /ComfyUI

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libgomp1 \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables to force CPU usage and optimize memory
ENV CUDA_VISIBLE_DEVICES=""
ENV PYTORCH_CUDA_ALLOC_CONF="max_split_size_mb:512"
ENV PYTORCH_NO_CUDA_MEMORY_CACHING=1
ENV PYTORCH_ENABLE_MPS_FALLBACK=1
ENV PYTORCH_MPS_HIGH_WATERMARK_RATIO=0.0
ENV PYTORCH_MPS_LOW_WATERMARK_RATIO=0.0
ENV COMFY_USE_CPU=1

# Copy requirements first to leverage Docker cache
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port
EXPOSE 8188

# Start the application with CPU mode and memory optimizations
CMD ["python", "main.py", "--listen", "0.0.0.0", "--force-fp16", "--cpu", "--use-split-cross-attention", "--lowvram"] 