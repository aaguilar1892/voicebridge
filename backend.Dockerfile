# Dockerfile for the Flask Backend (voicebridge-app/server)

# Use an official Python runtime as a parent image
# Using python:3.10 to match the CI workflow
FROM python:3.10-bullseye

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required by OpenCV and potentially other libraries
# Note: These dependencies are mainly specific to Debian Bullseye
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    libgtk2.0-dev \
    pkg-config \
    libavcodec-dev \
    libavformat-dev \
    libswscale-dev \
    libtbb2 \
    libtbb-dev \
    libjpeg-dev \
    libpng-dev \
    libtiff-dev \
    libdc1394-22-dev \
    libgl1 \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install uv and add it to PATH
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    export PATH="/root/.local/bin:$PATH"

# Copy the requirements file into the container at /app
COPY ./requirements.txt /app/

# Create and activate virtual environment, then install dependencies
ENV PATH="/root/.local/bin:$PATH"
RUN uv venv .venv && \
    . .venv/bin/activate && \
    uv pip install --upgrade pip && \
    uv pip install -r requirements.txt

# Copy the backend application code into the container at /app/server
COPY ./voicebridge-app/server /app/server

# Make port 5001 available to the world outside this container
EXPOSE 5001

# Define environment variable (optional, can be useful)
ENV NAME Backend

# Set the working directory specifically for running the app
WORKDIR /app/server

# Run app.py when the container launches with the virtual environment activated
CMD ["/bin/bash", "-c", "source /app/.venv/bin/activate && python app.py"]