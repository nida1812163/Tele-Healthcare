import { createClient, createMicrophoneAndCameraTracks } from "custom-agora-rtc-react";

const appId ="86a50dba2551407d995ec8c2fbf51968";
const token ="00686a50dba2551407d995ec8c2fbf51968IABcpa1xyLho32yJKLQ9IiKy3gB4NnOfOeLBgZV+wTv0gQx+f9gAAAAAEACJVdSDflK3YgEAAQB9Urdi";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "test";
