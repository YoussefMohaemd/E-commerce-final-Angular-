export interface Root {
    status: string
    session: Session
  }
  
  export interface Session {
    url: string
    success_url: string
    cancel_url: string
  }
  