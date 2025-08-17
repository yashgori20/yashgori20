const API_BASE_URL = 'https://yashgori20-get-me-a-job-ap.hf.space';

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  success?: boolean;
  token?: string;
  user?: {
    id?: string;
    email: string;
    subscription?: 'free' | 'pro';
  };
  message?: string;
}

export interface SubscriptionResponse {
  success: boolean;
  isPaid: boolean;
  usageLeft: number;
  plan: 'free' | 'pro';
  renewalDate?: string;
}

class ApiService {
  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...defaultHeaders,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // Add success field if missing (for backend compatibility)
      if (response.ok && !data.hasOwnProperty('success')) {
        data.success = true;
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async register(credentials: AuthRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/getmeajob/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async login(credentials: AuthRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/getmeajob/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async verifyToken(token: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/getmeajob/api/auth/verify', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getSubscriptionStatus(token: string): Promise<SubscriptionResponse> {
    return this.makeRequest<SubscriptionResponse>('/getmeajob/api/subscription/status', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async checkUpdates(): Promise<{
    latestVersion: string;
    downloadUrl: string;
    releaseNotes: string;
  }> {
    return this.makeRequest('/getmeajob/api/check-updates', {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
export default apiService;