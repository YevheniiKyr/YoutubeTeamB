CREATE TABLE Channel (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    description_channel TEXT,
    customURL VARCHAR(255),
    publishedAt DATETIME,
    defaultLanguage VARCHAR(255),
    country VARCHAR(255),
    viewCount  BIGINT,
    subscriberCount INT,
    videoCount INT
);

CREATE TABLE Video (
    id VARCHAR(255) PRIMARY KEY,
    publishedAt DATETIME,
    channelId VARCHAR(255),
    channelTitle VARCHAR(255),
    title VARCHAR(255),
    description_video TEXT,
    duration VARCHAR(255),
    definition_video VARCHAR(255),
    defaultAudioLanguage VARCHAR(30),
    viewCount BIGINT,
    likeCount INT,
    dislikeCount INT,
    favoriteCount INT,
    commentCount INT,
    recordingDate DATETIME,
    speechText TEXT,
    FOREIGN KEY (channelId) REFERENCES Channel(id) ON DELETE CASCADE
);

CREATE TABLE Comment (
    id VARCHAR(255) PRIMARY KEY,
    textDisplay TEXT,
    likeCount INT,
    publishedAt DATETIME,
    updatedAt DATETIME,
    parentId VARCHAR(255),
    videoId VARCHAR(255),
    FOREIGN KEY (parentId) REFERENCES Comment(id) ON DELETE NO ACTION,
    FOREIGN KEY (videoId) REFERENCES Video(id) ON DELETE CASCADE
);
