export default interface BotGateway {
  session_start_limit: {
    max_concurrency: number;
    remaining: number;
    reset_after: number;
    total: number;
  };
  shards: number;
  url: string;
}

export interface Gateway {
  url: string;
}
