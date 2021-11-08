<template>
  <div class="shop">
    <div class="container">
      <div class="columns">
        <div class="column" align="left">
          <b-field>
            <b-input
              placeholder="Search..."
              v-model="searchTerm"
              type="search"
              icon="magnify"
              hint="Doesn't work yet😥"
            >
            </b-input>
          </b-field>
        </div>
      </div>
      <div class="section">
        <div id="app" class="row columns is-multiline" v-if="searchTerm == ''">
          <div
            v-for="product in products"
            v-bind:key="product.id"
            class="column is-3"
          >
            <productCard :product="product" />
          </div>
        </div>
        <div id="app" class="row columns is-multiline" v-if="searchTerm != ''">
          <div
            v-for="product in filteredProducts"
            v-bind:key="product.id"
            class="column is-4"
          >
            <productCard :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "@/components/productCard.vue";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    // products: null,
    searchTerm: "",
  }),
  created() {
    this.$store.dispatch("product/listProductsAction");
    // this.fetchProducts();
  },
  components: {
    productCard,
  },
  computed: {
    ...mapGetters({
      products: "product/getProducts",
    }),
    filteredProducts: function () {
      return this.products.filter(
        (prod) =>
          prod.product_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          prod.product_description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );

    },
  },
  methods: {
  },
};
</script>
