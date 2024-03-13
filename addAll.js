import { createConnection, getRepository } from 'typeorm';
import {Channel}  from '../../dist/entities/Channel.js';

// Async function to connect to the database and insert a Channel
async function insertChannel() {
  try {
    // Establish a connection
    const connection = await createConnection(/* optionally pass in connection options here */);
    console.log('Connected to the database');

    // Create a new channel instance
    const newChannel = new Channel();
    newChannel.id = 'unique_channel_id'; // Make sure to use a unique ID
    newChannel.title = 'Channel Title';
    newChannel.descriptionChannel = 'Description of the channel';
    newChannel.customUrl = 'channel_custom_url';
    newChannel.publishedAt = new Date(); // Use the current date as an example
    newChannel.defaultLanguage = 'en';
    newChannel.country = 'Country Name';
    newChannel.viewCount = '1000';
    newChannel.subscriberCount = 100;
    newChannel.videoCount = 10;

    // Get the repository for the Channel entity
    const channelRepository = getRepository(Channel);

    // Save the new channel to the database
    await channelRepository.save(newChannel);
    console.log('Channel saved successfully');

    // Optionally, close the connection when done
    await connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error inserting channel:', error);
  }
}

// Execute the function
insertChannel();