"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/components/ui/input-group";

type ProductSearchBarProps = {
  classname?: string;
};

const ProductSearchBar = ({ classname }: ProductSearchBarProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <InputGroup className={`overflow-hidden bg-gray-200 ${classname}`}>
      <InputGroupInput
        placeholder="Cari..."
        className="bg-gray-200"
        value={search}
        autoComplete="off"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") handleSearch();
        }}
      />
      <InputGroupAddon className="pe-1">
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default ProductSearchBar;
