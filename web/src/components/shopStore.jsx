import { create } from 'zustand'
import axios from 'axios'

const useShopStore = create((set, get) => ({
  // State
  currentPage: 1,
  selectedFilter: 'all',
  showFilters: false,
  allProducts: [],
  filteredProducts: [],
  loading: true,
  error: null,
  
  // Constants
  PRODUCTS_PER_PAGE: 16,
  filters: [
    { id: 'all', label: 'See All' },
    { id: 'basics', label: 'Basics' },
    { id: 'graphic', label: 'Graphic Tees' },
    { id: 'oversized', label: 'Oversized' }
  ],

  // Actions
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedFilter: (filter) => {
    set({ selectedFilter: filter });
    get().filterProducts();
    get().setCurrentPage(1);
  },
  setShowFilters: (show) => set({ showFilters: show }),
  
  // Computed values
  getTotalPages: () => {
    const { filteredProducts, PRODUCTS_PER_PAGE } = get();
    return Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  },
  
  getCurrentPageProducts: () => {
    const { currentPage, filteredProducts, PRODUCTS_PER_PAGE } = get();
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  },

  // Complex actions
  fetchProducts: async () => {
    try {
      set({ loading: true });
      const response = await axios.get('http://localhost:8590/product');
      set({ allProducts: response.data, error: null });
      get().filterProducts();
    } catch (err) {
      set({ error: 'Failed to fetch products' });
      console.error('Error fetching products:', err);
    } finally {
      set({ loading: false });
    }
  },

  
  filterProducts: () => {
    const { selectedFilter, allProducts } = get();
    if (selectedFilter === 'all') {
      set({ filteredProducts: allProducts });
    } else {
      const categoryMap = {
        'basics': 'BASICS',
        'graphic': 'GRAPHICTEES',
        'oversized': 'OVERSIZED'
      };
      const filtered = allProducts.filter(product => 
        product.category === categoryMap[selectedFilter]
      );
      set({ filteredProducts: filtered });
    }
  },

  handlePrevPage: () => {
    const { currentPage } = get();
    get().setCurrentPage(Math.max(1, currentPage - 1));
  },

  handleNextPage: () => {
    const { currentPage } = get();
    const totalPages = get().getTotalPages();
    get().setCurrentPage(Math.min(totalPages, currentPage + 1));
  }
}));

export default useShopStore;