/* eslint-disable @typescript-eslint/member-ordering */

export default class Endpoints {
  // Audit Log
  /**
   * `/guilds/:guildID/audit-logs`
   * - GET - Get Guild Audit Log
   */
  public static GUILD_AUDIT_LOG(guildID: string) {
    return `/guilds/${guildID}/audit-logs`;
  }

  // Channel
  /**
   * `/channels/:channelID`
   * - GET - Get Channel
   * - PATCH - Modify Channel
   * - DELETE - Delete/Close Channel
   */
  public static CHANNEL(channelID: string) {
    return `/channels/${channelID}`;
  }
  /**
   * `/channels/:channelID/messages`
   * - GET - Get Channel Messages
   * - POST - Create Message
   */
  public static CHANNEL_MESSAGES(channelID: string) {
    return `/channels/${channelID}/messages`;
  }
  /**
   * `/channels/:channelID/messages/:messageID`
   * - GET - Get Channel Message
   * - PATCH - Edit Message
   * - DELETE - Delete Message
   */
  public static CHANNEL_MESSAGE(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}`;
  }
  /**
   * `/channels/:channelID/messages/:messageID/crosspost`
   * - POST - Crosspost Message
   */
  public static CHANNEL_MESSAGE_CROSSPOST(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}/crosspost`;
  }
  /**
   * `/channels/:channelID/messages/:messageID/reactions/:emoji/:userID`
   * - PUT - Create Reaction
   * - DELETE - Delete Own Reaction/Delete User Reaction
   */
  public static CHANNEL_MESSAGE_USER_REACTION(channelID: string, messageID: string, emoji: string, userID: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`;
  }
  /**
   * `/channels/:channelID/messages/:messageID/reactions/:emoji`
   * - GET - Get Reactions
   * - DELETE - Delete All Reactions for Emoji
   */
  public static CHANNEL_MESSAGE_REACTIONS_EMOJI(channelID: string, messageID: string, emoji: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions/${emoji}`;
  }
  /**
   * `/channels/:channelID/messages/:messageID/reactions`
   * - DELETE - Delete All Reactions
   */
  public static CHANNEL_MESSAGE_REACTIONS(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}/reactions`;
  }
  /**
   * `/channels/:channelID/messages/bulk-delete`
   * - POST - Bulk Delete Messages
   */
  public static CHANNEL_MESSAGES_BULK_DELETE(channelID: string) {
    return `/channels/${channelID}/messages/bulk-delete`;
  }
  /**
   * `/channels/:channelID/permissions/:overwriteID`
   * - PUT - Edit Channel Permissions
   * - DELETE - Delete Channel Permission
   */
  public static CHANNEL_OVERWRITE_PERMISSIONS(channelID: string, overwriteID: string) {
    return `/channels/${channelID}/permissions/${overwriteID}`;
  }
  /**
   * `/channels/:channelID/invites`
   * - GET - Get Channel Invites
   * - POST - Create Channel Invite
   */
  public static CHANNEL_INVITES(channelID: string) {
    return `/channels/${channelID}/invites`;
  }
  /**
   * `/channels/:channelID/followers
   * - POST - Follow News Channel
   */
  public static FOLLOW_NEWS_CHANNEL(channelID: string) {
    return `/channels/${channelID}/followers`;
  }
  /**
   * `/channels/:channelID/typing`
   * - POST - Trigger Typing Indicator
   */
  public static CHANNEL_TYPING(channelID: string) {
    return `/channels/${channelID}/typing`;
  }
  /**
   * `/channels/:channelID/pins`
   * - GET - Get Pinned Messages
   */
  public static CHANNEL_PINNED_MESSAGES(channelID: string) {
    return `/channels/${channelID}/pins`;
  }
  /**
   * `/channels/:channelID/pins/:messageID`
   * - PUT - Add Pinned Channel Message
   * - DELETE - Delete Pinned Channel Message
   */
  public static CHANNEL_PINNED_MESSAGE(channelID: string, messageID: string) {
    return `/channels/${channelID}/pins/${messageID}`;
  }
  /**
   * `/channels/:channelID/recipients/:userID`
   * - PUT - Group DM Add Recipient (OAuth2)
   * - DELETE - Group DM Remove Recipient (OAuth2)
   */
  public static GROUP_DM_RECIPIENT(channelID: string, userID: string) {
    return `/channels/${channelID}/recipients/${userID}`;
  }

  // Emoji
  /**
   * `/guilds/:guildID/emojis`
   * - GET - List Guild Emojis
   * - POST - Create Guild Emoji
   */
  public static GUILD_EMOJIS(guildID: string) {
    return `/guilds/${guildID}/emojis`;
  }
  /**
   * `/guilds/:guildID/emojis/:emojiID`
   * - GET - Get Guild Emoji
   * - PATCH - Modify Guild Emoji
   * - DELETE - Delete Guild Emoji
   */
  public static GUILD_EMOJI(guildID: string, emojiID: string) {
    return `/guilds/${guildID}/emojis/${emojiID}`;
  }

  // Guild
  /**
   * `/guilds`
   * - POST - Create Guild
   */
  public static GUILDS() {
    return '/guilds';
  }

  /**
   * `/guilds/:guildID`
   * - GET - Get Guild
   * - PATCH - Modify Guild
   * - DELETE - Delete Guild
   */
  public static GUILD(guildID: string) {
    return `/guilds/${guildID}`;
  }

  /**
   * `/guilds/:guildID/preview`
   * - GET - Get Guild Preview
   */
  public static GUILD_PREVIEW(guildID: string) {
    return `/guilds/${guildID}/preview`;
  }

  /**
   * `/guilds/:guildID/channels`
   * - GET - Get Guild Channels
   * - POST - Create Guild Channel
   * - PATCH - Modify Guild Channel Positions
   */
  public static GUILD_CHANNEL(guildID: string) {
    return `/guilds/${guildID}/channels`;
  }
  /**
   * `/guilds/:guildID/members/:userID`
   * - GET - Get Guild Member
   * - PUT - Add Guild Member (OAuth2)
   * - PATCH - Modify Guild Member
   * - DELETE - Remove Guild Member
   */
  public static GUILD_MEMBER(guildID: string, userID: string) {
    return `/guilds/${guildID}/members/${userID}`;
  }

  /**
   * `/guilds/:guildID/members`
   * - GET - List Guild Members
   */
  public static GUILD_MEMBERS(guildID: string) {
    return `/guilds/${guildID}/members`;
  }

  /**
   * `/guilds/:guildID/members/@me/nick`
   * - PATCH - Modify Current User Nick
   */
  public static GUILD_SELF_NICK(guildID: string) {
    return `/guilds/${guildID}/members/@me/nick`;
  }

  /**
   * `/guilds/:guildID/members/:userID/roles/:roleID`
   * - PUT - Add Guild Member Role
   * - DELETE - Remove Guild Member Role
   */
  public static GUILD_MEMBER_ROLE(guildID: string, userID: string, roleID: string) {
    return `/guilds/${guildID}/members/${userID}/roles/${roleID}`;
  }
  /**
   * `/guilds/:guildID/bans`
   * - GET - Get Guild Bans
   */
  public static GUILD_BANS(guildID: string) {
    return `/guilds/${guildID}/bans`;
  }
  /**
   * `/guilds/:guildID/bans/:userID`
   * - GET - Get Guild Ban
   * - PUT - Create Guild Ban
   * - DELETE - Remove Guild Ban
   */
  public static GUILD_BAN(guildID: string, userID: string) {
    return `/guilds/${guildID}/bans/${userID}`;
  }
  /**
   * `/guilds/:guildID/roles`
   * - GET - Get Guild Roles
   * - POST - Create Guild Role
   * - PATCH - Modify Guild Role Positions
   */
  public static GUILD_ROLES(guildID: string) {
    return `/guilds/${guildID}/roles`;
  }
  /**
   * `/guilds/:guildID/roles/:roleID`
   * - PATCH - Modify Guild Role
   * - DELETE - Delete Guild Role
   */
  public static GUILD_ROLE(guildID: string, roleID: string) {
    return `/guilds/${guildID}/roles/${roleID}`;
  }
  /**
   * `/guilds/:guildID/prune`
   * - GET - Get Guild Prune Count
   * - POST - Begin Guild Prune
   */
  public static GUILD_PRUNE(guildID: string) {
    return `/guilds/${guildID}/prune`;
  }
  /**
   * `/guilds/:guildID/regions`
   * - GET - Get Guild Voice Regions
   */
  public static GUILD_VOICE_REGIONS(guildID: string) {
    return `/guilds/${guildID}/regions`;
  }
  /**
   * `/guilds/:guildID/invites`
   * - GET - Get Guild Invites
   */
  public static GUILD_INVITES(guildID: string) {
    return `/guilds/${guildID}/invites`;
  }
  /**
   * `/guilds/:guildID/integrations`
   * - GET - Get Guild Integrations
   * - POST - Create Guild Integration
   */
  public static GUILD_INTEGRATIONS(guildID: string) {
    return `/guilds/${guildID}/integrations`;
  }
  /**
   * `/guilds/:guildID/integrations/:integrationID`
   * - PATCH - Modify Guild Integration
   * - DELETE - Delete Guild Integration
   */
  public static GUILD_INTEGRATION(guildID: string, integrationID: string) {
    return `/guilds/${guildID}/integrations/${integrationID}`;
  }
  /**
   * `/guilds/:guildID/integrations/:integrationID/sync`
   * - POST - Sync Guild Integration
   */
  public static GUILD_INTEGRATION_SYNC(guildID: string, integrationID: string) {
    return `/guilds/${guildID}/integrations/${integrationID}/sync`;
  }
  /**
   * `/guilds/:guildID/widget`
   * - GET - Get Guild Widget Settings
   * - PATCH - Modify Guild Widget
   */
  public static GUILD_WIDGET(guildID: string) {
    return `/guilds/${guildID}/widget`;
  }
  /**
   * `/guilds/:guildID/widget.json
   * - GET - Get Guild Widget
   */
  public static GUILD_WIDGET_JSON(guildID: string) {
    return `/guilds/${guildID}/widget.json`;
  }
  /**
   * `/guilds/:guildID/vanity-url`
   * - GET - Get Guild Vanity URL
   */
  public static GUILD_VANITY_URL(guildID: string) {
    return `/guilds/${guildID}/vanity-url`;
  }
  /**
   * `/guilds/:guildID/widget.png`
   * - GET - Get Guild Widget Image (No auth)
   */
  public static GUILD_WIDGET_IMAGE(guildID: string) {
    return `/guilds/${guildID}/widget.png`;
  }

  // Invites
  /**
   * `/invites/:code`
   * - GET - Get Invite
   * - DELETE - Delete Invite
   */
  public static INVITE(code: string) {
    return `/invites/${code}`;
  }

  // Template
  /**
   * `/guilds/templates/:code`
   * - GET - Get Template
   * - POST - Create Guild from Template
   */
  public static TEMPLATE(code: string) {
    return `/guilds/templates/${code}`;
  }
  /**
   * `/guilds/:guildID/templates`
   * - GET - Get Guild Templates
   * - POST - Create Guild Template
   */
  public static GUILD_TEMPLATES(guildID: string) {
    return `/guilds/${guildID}/templates`;
  }
  /**
   * `/guilds/:guildID/templates/:code`
   * - PUT - Sync Guild Template
   * - PATCH - Modify Guild Template
   * - DELETE - Delete Guild Template
   */
  public static GUILD_TEMPLATE(guildID: string, code: string) {
    return `/guilds/${guildID}/templates/${code}`;
  }

  // Threads
  /**
   * `/channels/{channel.id}/messages/{message.id}/threads`
   * - POST - Creates a new thread from an existing message
   */
  public static START_THREAD_WITH_MESSAGE(channelID: string, messageID: string) {
    return `/channels/${channelID}/messages/${messageID}/threads`;
  }
  /**
   * `/channels/{channel.id}/threads`
   * - POST - Creates a new thread that is not connected to an existing message
   */
  public static START_THREAD_WITHOUT_MESSAGE(channelID: string) {
    return `/channels/${channelID}/threads`;
  }
  /**
   * `/channels/{channel.id}/thread-members/@me`
   * - PUT - Adds the current user to a thread
   * - DELETE - Removes the current user from a thread
   */
  public static THREAD(channelID: string) {
    return `/channels/${channelID}/thread-members/@me`;
  }
  /**
   * `/channels/{channel.id}/thread-members/{user.id}`
   * - PUT - Adds another member to a thread
   * - DELETE - Removes another member from a thread
   */
  public static THREAD_MEMBER(channelID: string, userID: string) {
    return `/channels/${channelID}/thread-members/${userID}`;
  }
  /**
   * `/channels/{channel.id}/thread-members`
   * - GET - Returns array of thread members objects that are members of the thread
   */
  public static LIST_THREAD_MEMBERS(channelID: string) {
    return `/channels/${channelID}/thread-members`;
  }
  /**
   * `/channels/{channel.id}/threads/active`
   * - GET - Returns all active threads in the channel, including public and private threads
   */
  public static LIST_ACTIVE_THREADS(channelID: string) {
    return `/channels/${channelID}/threads/active`;
  }
  /**
   * `/channels/{channel.id}/threads/archived/public OR private`
   * - GET & type = public - Returns archived threads in the channel that are public
   * - GET & type = private - Returns archived threads in the channel that are of type GUILD_PRIVATE_THREAD
   */
  public static LIST_ARCHIVED_THREADS(channelID: string, type: 'public' | 'private') {
    return `/channels/${channelID}/threads/archived/${type}`;
  }
  /**
   * `/channels/{channel.id}/users/@me/threads/archived/private`
   * - GET - Returns archived threads in the channel that are of type GUILD_PRIVATE_THREAD, and the user has joined
   */
  public static LIST_JOINED_PRIVATE_ARCHIVED_THREADS(channelID: string) {
    return `/channels/${channelID}/users/@me/threads/archived/private`;
  }

  // User
  /**
   * `/users/:userID`
   * - GET - Get Current User (OAuth2 optional)/Get User
   * - PATCH - Modify Current User
   */
  public static USER(userID: string) {
    return `/users/${userID}`;
  }
  /**
   * `/users/@me/guilds`
   * - GET - Get Current User Guilds (OAuth2 optional)
   */
  public static USER_GUILDS() {
    return '/users/@me/guilds';
  }
  /**
   * `/users/@me/guilds/:guildID`
   * - DELETE - Leave Guild
   */
  public static USER_GUILD(guildID: string) {
    return `/users/@me/guilds/${guildID}`;
  }
  /**
   * `/users/@me/channels`
   * - GET - Get User DMs (OAuth2 - Will return empty array for bots)
   * - POST - Create DM
   * - POST - Create Group DM (OAuth2) - Deprecated GameBridge SDK
   */
  public static USER_CHANNELS() {
    return '/users/@me/channels';
  }
  /**
   * `/users/@me/connections`
   * - GET - Get User Connections (OAuth2 - Will return empty array for bots)
   */
  public static USER_CONNECTIONS() {
    return '/users/@me/connections';
  }

  // Voice
  /**
   * `/voice/regions`
   * - GET - List Voice Regions
   */
  public static VOICE_REGIONS() {
    return '/voice/regions';
  }

  // Webhook
  /**
   * `/channels/:channelID/webhooks`
   * - GET - Get Channel Webhooks
   * - POST - Create Webhook
   */
  public static CHANNEL_WEBHOOK(channelID: string) {
    return `/channels/${channelID}/webhooks`;
  }
  /**
   * `/channels/:guildID/webhooks`
   * - GET - Get Guild Webhooks
   */
  public static GUILD_WEBHOOK(guildID: string) {
    return `/guilds/${guildID}/webhooks`;
  }
  /**
   * `/webhooks/:webhookID`
   * - GET - Get Webhook
   * - PATCH - Modify Webhook
   * - DELETE - Delete Webhook
   */
  public static WEBHOOK(webhookID: string) {
    return `/webhooks/${webhookID}`;
  }
  /**
   * `/webhooks/:webhookID/:token`
   * - GET - Get Webhook with Token (No Auth)
   * - PATCH - Modify Webhook with Token (No Auth)
   * - DELETE - Delete Webhook with Token (No Auth)
   * - POST - Execute Webhook (No Auth)
   */
  public static WEBHOOK_TOKEN(webhookID: string, token: string) {
    return `/webhooks/${webhookID}/${token}`;
  }
  /**
   * `/webhooks/:webhookID/:token/slack`
   * - POST - Execute Slack-Compatible Webhook
   */
  public static WEBHOOK_SLACK(webhookID: string, token: string) {
    return `/webhooks/${webhookID}/${token}/slack`;
  }
  /**
   * `/webhooks/:webhookID/:token/github`
   * - POST - Execute Github-Compatible Webhook
   */
  public static WEBHOOK_GITHUB(webhookID: string, token: string) {
    return `/webhooks/${webhookID}/${token}/github`;
  }

  // Gateway
  /**
   * `/gateway`
   * - GET - Get Gateway (No Auth)
   */
  public static GATEWAY() {
    return '/gateway';
  }
  /**
   * `/gateway/bot`
   * - GET - Get Gateway Bot
   */
  public static GATEWAY_BOT() {
    return '/gateway/bot';
  }

  // OAuth2
  /**
   * `/oauth2/applications/@me`
   * - GET - Get Current Application Information
   */
  public static APPLICATION_INFORMATION() {
    return '/oauth2/applications/@me';
  }
}
