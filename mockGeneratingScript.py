import json
import random
import string
from datetime import datetime, timedelta

# Helper functions to generate mock data

def random_string(length=255):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def random_text(length=255):
    return ''.join(random.choices(string.ascii_letters + string.digits + ' ', k=random.randint(1, length)))

def random_date():
    start_date = datetime.strptime('2020-01-01', '%Y-%m-%d')
    end_date = datetime.now()
    return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

def random_int(max_value=1000):
    return random.randint(0, max_value)

def random_bigint():
    return random.randint(0, 1000000)

# Function to generate a mock Channel entry
def create_mock_channel():
    return {
        "id": random_string(),
        "title": random_string(255),
        "description_channel": random_text(),
        "customURL": random_string(),
        "publishedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "default_language": random_string(30),
        "country": random_string(50),
        "viewCount": random_bigint(),
        "subscriberCount": random_int(),
        "videoCount": random_int()
    }

# Function to generate a mock Comment entry
def create_mock_comment():
    return {
        "id": random_string(),
        "textDisplay": random_text(),
        "likeCount": random_int(),
        "publishedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "updatedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "parentId": random_string(),
        "videoId": random_string()
    }

# Function to generate a mock Video entry
def create_mock_video():
    return {
        "id": random_string(),
        "publishedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "channelId": random_string(),
        "channelTitle": random_string(255),
        "title": random_string(255),
        "description_video": random_text(),
        "duration": random_string(255),
        "definition_video": random_string(30),
        "defaultAudioLanguage": random_string(30),
        "viewCount": random_bigint(),
        "likeCount": random_int(),
        "dislikeCount": random_int(),
        "favoriteCount": random_int(),
        "commentCount": random_int(),
        "recordingDate": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "speechText": random_text()
    }

# Generate mock data
mock_channels = [create_mock_channel() for _ in range(500)]
mock_comments = [create_mock_comment() for _ in range(500)]
mock_videos = [create_mock_video() for _ in range(500)]

# Export to JSON files
with open('/mnt/data/mock_channels.json', 'w') as f:
    json.dump(mock_channels, f)

with open('/mnt/data/mock_comments.json', 'w') as f:
    json.dump(mock_comments, f)

with open('/mnt/data/mock_videos.json', 'w') as f:
    json.dump(mock_videos, f)

# Provide the paths to the created JSON files
json_file_paths = {
    "channels": "/mnt/data/mock_channels.json",
    "comments": "/mnt/data/mock_comments.json",
    "videos": "/mnt/data/mock_videos.json"
}

json_file_paths
