<template>
  <div class="cart">
    <div class="container">
      <div class="section" v-if="!paidFor">
        <div id="app" class="row columns is-multiline">
          <div
            v-for="product in products"
            v-bind:key="product.id"
            class="column is-4"
          >
            <productCard :product="product" />
          </div>
        </div>
        <hr class="solid" />
        <p>Checkout</p>
        <hr class="solid" />
        <div class="has-text-right">
          <strong>Total: ${{ cart.price }}</strong>
        </div>
        <div ref="paypal"></div>
      </div>
      <div v-if="paidFor">
        <h1>We appreciate your business</h1>
      </div>
    </div>
  </div>
</template>

<script>
import productCard from "@/components/productCard.vue";
import { mapGetters } from "vuex";
export default {
  data: () => ({
    loaded: false,
    paidFor: false,
  }),
  components: {
    productCard,
  },
  computed: {
    ...mapGetters({
      products: "product/getProductsInCart",
      cart: "product/getTotalCart",
    }),
  },
  mounted: function () {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARyPq7hRBbZl6fPlYayb5Pkcmd1SF26lbggn-DOomnTdwjzIHDscsPUP9L_OmHD_JKlOJPxM6TyZv5T_&currency=CAD";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function () {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.cart.description,
                  amount: {
                    // currency_code: "CAD",
                    value: this.cart.price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
</script>
<style>
/* Solid border */
hr.solid {
  border-top: 3px solid #bbb;
}
</style>
