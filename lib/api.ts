const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

class ApiClient {
    private token: string | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.token = localStorage.getItem('token');
        }
    }

    setToken(token: string) {
        this.token = token;
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', token);
        }
    }

    clearToken() {
        this.token = null;
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            const headers = new Headers();
            headers.append('Authorization', `Bearer ${this.token}`);
            // headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Unknown error' }));
            throw new Error(error.message || 'Request failed');
        }

        return response.json();
    }

    // Auth
    async register(email: string, password: string, name: string) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, name }),
        });
    }

    async login(email: string, password: string) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    // Users
    async getProfile() {
        return this.request('/users/me');
    }

    // Courses
    async getCourses() {
        return this.request('/courses');
    }

    async getCourse(id: string) {
        return this.request(`/courses/${id}`);
    }

    async enrollCourse(id: string) {
        return this.request(`/courses/${id}/enroll`, {
            method: 'POST',
        });
    }

    async getMyEnrollments() {
        return this.request('/courses/my/enrollments');
    }

    // Lessons
    async getLesson(id: string) {
        return this.request(`/lessons/${id}`);
    }

    async getCourseLessons(courseId: string) {
        return this.request(`/lessons/course/${courseId}`);
    }

    // Progress
    async updateProgress(lessonId: string, data: any) {
        return this.request(`/progress/lesson/${lessonId}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async getCourseProgress(courseId: string) {
        return this.request(`/progress/course/${courseId}`);
    }

    async getDashboard() {
        return this.request('/progress/dashboard');
    }

    // Groups
    async getGroups() {
        return this.request('/groups');
    }

    async getMyGroups() {
        return this.request('/groups/my');
    }

    async getGroup(id: string) {
        return this.request(`/groups/${id}`);
    }

    async createGroup(data: { name: string; description?: string; courseId?: string }) {
        return this.request('/groups', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async joinGroup(id: string) {
        return this.request(`/groups/${id}/join`, {
            method: 'POST',
        });
    }

    async leaveGroup(id: string) {
        return this.request(`/groups/${id}/leave`, {
            method: 'DELETE',
        });
    }
}

export const api = new ApiClient();