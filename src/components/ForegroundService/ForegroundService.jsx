import VIForegroundService from '@voximplant/react-native-foreground-service';
import React, {useEffect} from 'react';
import {Pressable, Text} from 'react-native';

export const ForegroundService = () => {
  async function createChannel() {
    const channelConfig = {
      id: 'channelId',
      name: 'Channel name',
      description: 'Channel description',
      enableVibration: false,
    };
    await VIForegroundService.getInstance().createNotificationChannel(
      channelConfig,
    );
  }

  async function startForegroundService() {
    const notificationConfig = {
      channelId: 'channelId',
      id: 3456,
      title: 'Title',
      text: 'Some text',
      icon: 'ic_icon',
      button: 'Some text',
    };
    try {
      await VIForegroundService.getInstance().startService(notificationConfig);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    createChannel();
  }, []);

  return (
    <Pressable onPress={startForegroundService}>
      <Text>Start</Text>
    </Pressable>
  );
};
