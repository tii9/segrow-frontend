import { Suspense } from "react";
import CategorySection from "~/features/home/components/CategorySection";
import RecommendationSection from "~/features/home/components/RecommendationSection";
import ProductSearchBar from "~/features/home/shared/ProductSearchBar";

const HomePage = () => {
  return (
    <Suspense>
      <div className="px-4 pt-6 pb-20">
        <div>
          <h1 className="text-2xl font-semibold">SeGrow</h1>
          <h3 className="text-sm font-semibold">Satu Paket, Siap Masak. 🥬</h3>

          <ProductSearchBar classname="my-4" />
          <CategorySection />
          <RecommendationSection />
        </div>
      </div>
    </Suspense>
  );
};

export default HomePage;
