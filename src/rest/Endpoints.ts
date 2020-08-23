export default class Endpoints {
  /**
   * `/channels/${channelID}`
   * - GET
   * - PATCH
   * - DELETE
   */
  public static CHANNEL(channelID: string) {
    return `/channels/${channelID}`;
  }
  /**
   * `/channels/${channelID}/messages`
   * - GET
   * - POST
   */
  public static CHANNEL_MESSAGES(channelID: string) {
    return `/channels/${channelID}/messages`;
  }
  /**
   * `/channels/${channelID}/messages/${messageID}`
   * - PATCH
   * - DELETE
   */
  public static CHANNEL_MESSAGE(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}`;
  }
  /**
   * `/channels/${channelID}/messages/${messageID}/reactions/${reaction}/${userID}`
   * - PUT
   * - DELETE
   */
  public static CHANNEL_MESSAGE_USER_REACTION(channelID: string, messageID: string, reaction: string, userID: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions/${reaction}/${userID}`;
  }
  /**
   * `/channels/${channelID}/messages/${messageID}/reactions/${reaction}`
   * - GET
   * - DELETE
   */
  public static CHANNEL_MESSAGE_REACTION(channelID: string, messageID: string, reaction: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions/${reaction}`;
  }
  /**
   * `/channels/${channelID}/messages/${messageID}/reactions`
   * - GET
   * - DELETE
   */
  public static CHANNEL_MESSAGE_REACTIONS(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions`;
  }
  /**
   * `/channels/${channelID}/bulk-delete`
   * - DELETE
   */
  public static CHANNEL_MESSAGE_BULK_DELETE(channelID: string) {
    return `/channels/${channelID}/bulk-delete`;
  }
  /**
   * `/channels/${channelID}/permissions/${overwriteID}`
   * - PUT
   * - DELETE
   */
  public static CHANNEL_OVERWRITE_PERMISSIONS(channelID, overwriteID) {
    return `/channels/${channelID}/permissions/${overwriteID}`;
  }
  /**
   * `/channels/${channelID}/invites`
   * - GET
   * - POST
   */
  public static CHANNEL_INVITES(channelID: string) {
    return `/channels/${channelID}/invites`;
  }
  /**
   * `/channels/${channelID}/typing`
   * - POST
   */
  public static CHANNEL_TYPING(channelID: string) {
    return `/channels/${channelID}/typing`;
  }
  /**
   * `/channels/${channelID}/pins`
   * - GET
   */
  public static CHANNEL_PINNED_MESSAGES(channelID: string) {
    return `/channels/${channelID}/pins`;
  }
  /**
   * `/channels/${channelID}/pins/${messageID}`
   * - PUT
   * - DELETE
   */
  public static CHANNEL_PINNED_MESSAGE(channelID: string, messageID: string) {
    return `/channels/${channelID}/pins/${messageID}`;
  }

  /**
   * `/users/@me`
   * - GET
   * - PATCH
   */
  public static CURRENT_USER() {
    return `/users/@me`;
  }
  /**
   * `/users/${userID}`
   * - GET
   */
  public static USER(userID: string) {
    return `/users/${userID}`;
  }
  /**
   * `/users/@me/guilds`
   * - GET
   * - PATCH
   */
  public static CURRENT_USER_GUILDS() {
    return `/users/@me/guilds`;
  }
  /**
   * ` /users/@me/channels`
   * - POST
   * - GET
   */
  public static CREATE_DM() {
    return `/users/@me/channels`;
  }
}
