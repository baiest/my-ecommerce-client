const API_URL = 'http://192.168.1.55:5000/api'

export const API_LOGIN = `${API_URL}/login/login`
export const API_AUTH = `${API_URL}/users/auth`
export const API_USER_CART = `${API_URL}/users/cart`
export const API_PRODUCTS = `${API_URL}/products/query`
export const API_PRODUCT_ID = (id) => `${API_URL}/products/${id}`
export const API_PRODUCTS_CATEGORY = (id) => `${API_URL}/products/category/${id}`
export const API_PRODUCT_IMAGE = (id, name_image) => `${API_URL}/products/img/${id}${name_image ? `/${name_image}` : ''}`
export const API_CATEGORIES = `${API_URL}/categories`