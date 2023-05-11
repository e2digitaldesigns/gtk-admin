export enum AppRoutes {
  Home = "/admin/home",
  DashBoard = "/admin/dashBoard",

  Episodes = "/admin/podcast/episodes",
  EpisodesNew = "/admin/podcast/episodes/new",
  EpisodesProfile = "/admin/podcast/episodes/:id",
  EpisodesProfileLink = "/admin/podcast/episodes/",

  Hosts = "/admin/podcast/hosts",
  HostNew = "/admin/podcast/hosts/new",
  HostProfile = "/admin/podcast/hosts/:id",
  HostProfileLink = "/admin/podcast/hosts/",

  Socials = "/admin/podcast/social-networks",
  SocialNew = "/admin/podcast/social-networks/new",
  SocialProfile = "/admin/podcast/social-networks/:id",
  SocialProfileLink = "/admin/podcast/social-networks/",

  Templates = "/admin/podcast/templates",
  TemplateNew = "/admin/podcast/templates/new",
  TemplateProfile = "/admin/podcast/templates/:id",
  TemplateProfileLink = "/admin/podcast/templates/",

  Controls = "/admin/podcast/controls",

  ChatBots = "/admin/chat-bots",
  ChatBotsConnectTwitch = "/admin/chat-bots/connect-twitch",

  ShowRunner = "/public/show-runner/:id"
}
