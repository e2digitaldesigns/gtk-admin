export interface IHostSocials {
  _id: string;
  site: string;
  username: string;
}

export interface IHosts {
  _id: string;
  name: string;
  img?: string;
  socials: IHostSocials[];
}
