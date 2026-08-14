import TopNavbar from "~/components/navbar/TopNavbar";
import ProductSearchBar from "~/features/home/shared/ProductSearchBar";
import CategoryFilterList from "~/features/categories/components/CategoryFilterList";
import ProductsList from "~/features/products/components/ProductList";

const ProductsPage = () => {
  return (
    <div>
      <TopNavbar header="Produk" className="space-y-4">
        <ProductSearchBar />
      </TopNavbar>

      <div className="mx-4 mt-4 mb-20">
        <CategoryFilterList />
        <ProductsList />
      </div>
    </div>
  );
};

export default ProductsPage;
