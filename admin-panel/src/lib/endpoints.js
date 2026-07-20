import api from "./api";

// ---- Auth ----
export const login = (email, password) => api.post("/auth/login", { email, password });
export const getMe = () => api.get("/auth/me");
export const changePassword = (currentPassword, newPassword) =>
  api.put("/auth/change-password", { currentPassword, newPassword });

// ---- Singletons ----
export const heroApi = {
  get: () => api.get("/admin/hero"),
  update: (data) => api.put("/admin/hero", data),
};

export const aboutApi = {
  get: () => api.get("/admin/about"),
  update: (data) => api.put("/admin/about", data),
};

export const contactApi = {
  get: () => api.get("/admin/contact"),
  update: (data) => api.put("/admin/contact", data),
};

// ---- Messages (read-only inbox) ----
export const messagesApi = {
  list: () => api.get("/admin/messages"),
  markRead: (id) => api.put(`/admin/messages/${id}/read`),
  remove: (id) => api.delete(`/admin/messages/${id}`),
};

// ---- Generic CRUD factory for list-based resources ----
// (skills, experience, projects, certifications, achievements all follow
// the exact same REST pattern, so we build the calls once and reuse them)
function crudApi(resource) {
  return {
    list: () => api.get(`/admin/${resource}`),
    create: (data) => api.post(`/admin/${resource}`, data),
    update: (id, data) => api.put(`/admin/${resource}/${id}`, data),
    remove: (id) => api.delete(`/admin/${resource}/${id}`),
  };
}

export const skillsApi = {
  ...crudApi("skills"),
  reorder: (items) => api.put("/admin/skills/reorder", { items }),
};
export const experienceApi = crudApi("experience");
export const projectsApi = crudApi("projects");
export const certificationsApi = crudApi("certifications");
export const achievementsApi = crudApi("achievements");

// ---- Upload ----
export const uploadFile = (file, onProgress) => {
  const formData = new FormData();
  formData.append("image", file);
  return api.post("/admin/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (evt) => {
      if (onProgress && evt.total) {
        onProgress(Math.round((evt.loaded * 100) / evt.total));
      }
    },
  });
};
