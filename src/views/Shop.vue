<template>
  <div class="shop">
    <div class="container">
      <div class="columns">
        <div class="column is-one-fifth" align="left">
          <p>Search Products</p>
          <b-field>
            <b-input
              placeholder="Search..."
              v-model="searchTerm"
              type="search"
              icon="magnify"
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
            class="column is-4"
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
// import { API } from "aws-amplify";
// import { listProducts } from "@/graphql/queries.js";
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
          prod.product_name.includes(this.searchTerm) ||
          prod.product_description.includes(this.searchTerm)
      );
    },
  },
  methods: {
    // async fetchProducts() {
    //   try {
    //     const products = await API.graphql({
    //       query: listProducts,
    //     });
    //     console.log(products);
    //     console.log(products.data.listProducts.items);
    //     this.products = products.data.listProducts.items;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
};
</script>
