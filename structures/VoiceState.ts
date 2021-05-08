import GuildMember from './GuildMember';

export default interface VoiceState {
  channel_id: string | null;
  deaf: boolean;
  guild_id?: string;
  member?: GuildMember;
  mute: boolean;
  request_to_speak_timestamp: Date | null;
  self_deaf: boolean;
  self_mute: boolean;
  self_stream?: boolean;
  self_video: boolean;
  session_id: string;
  suppress: boolean;
  user_id: string;
}
