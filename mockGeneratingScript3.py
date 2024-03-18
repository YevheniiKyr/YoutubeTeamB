# Since we need to interlink the data, let's redefine the mock data generation to include relationships

# Redefine to keep track of IDs
channel_ids = [random_string() for _ in range(500)]
video_ids = [random_string() for _ in range(500)]
comment_ids = [random_string() for _ in range(500)]

# Function to generate a mock Channel entry with an ID from the list
def create_mock_channel(channel_id):
    return {
        "id": channel_id,
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

# Function to generate a mock Video entry with channel ID and video ID
def create_mock_video(channel_id, video_id):
    return {
        "id": video_id,
        "publishedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "channelId": channel_id,
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

# Function to generate a mock Comment entry with video ID and possibly matching parent ID
def create_mock_comment(comment_id, video_ids, comment_ids):
    parent_id = random.choice([None, random.choice(comment_ids)])
    return {
        "id": comment_id,
        "textDisplay": random_text(),
        "likeCount": random_int(),
        "publishedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "updatedAt": random_date().strftime('%Y-%m-%dT%H:%M:%S'),
        "parentId": parent_id,
        "videoId": random.choice(video_ids)
    }

# Generate mock data with interlinked IDs
mock_channels = [create_mock_channel(cid) for cid in channel_ids]
mock_videos = [create_mock_video(random.choice(channel_ids), vid) for vid in video_ids]
mock_comments = [create_mock_comment(cid, video_ids, comment_ids) for cid in comment_ids]

# Re-export the JSON files with pretty formatting (indented for readability)
with open('/mnt/data/mock_channels_interlinked_pretty.json', 'w') as f:
    json.dump(mock_channels, f, indent=4)

with open('/mnt/data/mock_comments_interlinked_pretty.json', 'w') as f:
    json.dump(mock_comments, f, indent=4)

with open('/mnt/data/mock_videos_interlinked_pretty.json', 'w') as f:
    json.dump(mock_videos, f, indent=4)

# Provide the paths to the prettified JSON files with interlinked IDs
json_interlinked_pretty_file_paths = {
    "channels_interlinked_pretty": "/mnt/data/mock_channels_interlinked_pretty.json",
    "comments_interlinked_pretty": "/mnt/data/mock_comments_interlinked_pretty.json",
    "videos_interlinked_pretty": "/mnt/data/mock_videos_interlinked_pretty.json"
}

json_interlinked_pretty_file_paths
