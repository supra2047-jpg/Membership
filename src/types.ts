export interface Member {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  tier: 'free' | 'premium' | 'enterprise';
  joinDate: string;
}

export interface Activity {
  id: string;
  type: 'join' | 'payment' | 'system' | 'edit';
  title: string;
  description: string;
  timestamp: string;
  userId?: string;
}
