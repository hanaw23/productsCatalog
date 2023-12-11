import { useRouter } from "next/router";
import { useEffect, useState, SetStateAction } from "react";
import { Product } from "../../model/product.type";

const Products = () => {
  const router = useRouter();
  const take = 10;
  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  //  Fetch Data
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounce(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch(`https://dummyjson.com/products/?limit=10&skip=0`);
      const json = await data.json();

      // set state with the result
      setProducts(json.products);
    };

    fetchData().catch(console.error);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    const query = `https://dummyjson.com/products/?limit=${take}&skip=${skip}`;
    const fetchData = async () => {
      const data = await fetch(query);
      const json = await data.json();

      // set state with the result
      if (products.length > 0) {
        setProducts([...products, ...json.products]);
      } else {
        setProducts(json.products);
      }
    };

    fetchData().catch(console.error);
    setLoading(false);
  }, [skip]);

  useEffect(() => {
    setLoading(true);
    const query = search !== "" || !search ? `https://dummyjson.com/products/search?q=${search}` : "https://dummyjson.com/products";
    const fetchData = async () => {
      const data = await fetch(query);
      const json = await data.json();

      // set state with the result
      setProducts(json.products);
    };

    fetchData().catch(console.error);
    setLoading(false);
  }, [debounce, search]);

  // pagination load more data
  const loadMoreProducts = () => {
    setSkip(skip + take);
  };

  // redirect to details
  const redirectToDetails = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div className="mb-10">
      {loading ? (
        <div className="text-gray-900 flex justify-center text-center my-[50%] font-semibold text-base">Loading ...</div>
      ) : (
        <div className="text-gray-800">
          <div className="flex flex-col justify-center text-center mt-4">
            <h1 className="font-bold text-5xl">Products</h1>
            <p className="text-base">Product of this year</p>
          </div>
          <div className="mx-10 mt-6">
            <input
              className="w-[100%] p-[0.5rem] border rounded outline-none"
              placeholder="Search products"
              autoComplete="off"
              value={search}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setSearch(e.target.value as string)}
            />
          </div>
          <div className="mt-10 grid grid-cols-5 gap-5 mx-10">
            {products.map((product) => (
              <div key={product.id} className="border rounded bg-gray-300 p-4 cursor-pointer" onClick={() => redirectToDetails(product.id)}>
                <div className="flex justify-center">
                  <img src={product.thumbnail} className="border rounded h-[150px] w-[250px]" alt="product thumbnail" />
                </div>
                <div className="text-gray-700 mt-4">
                  <h1 className="text-base font-semibold">{product.title}</h1>
                  <p className="text-xs truncate">{product.description}</p>
                </div>
                <div className="text-gray-700 mt-2">
                  <p className="text-xs truncate">$ {product.price}</p>
                </div>
              </div>
            ))}
          </div>
          {search || search !== "" ? null : (
            <div className="flex justify-center mt-4">
              <button onClick={() => loadMoreProducts} type="button" className="bg-slate-500 p-2 rounded">
                <p className="text-base font-semibold text-white">Load More</p>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
