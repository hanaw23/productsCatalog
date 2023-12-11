import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "../../../model/product.type";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  const [product, setProduct] = useState<Product>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<string>("");

  //  Fetch Data
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await fetch(`https://dummyjson.com/products/${productId}`);
      const json = await data.json();
      // set state with the result
      setProduct(json);
    };

    fetchData().catch(console.error);
    setLoading(false);
  }, []);

  //   select image
  const selectImageProduct = (imageSrc: string) => {
    setSelectImage(imageSrc);
  };
  // redirect to list
  const redirectToList = () => {
    router.push(`/products/`);
  };

  return (
    <div className="mb-10">
      {loading ? (
        <div className="text-gray-900 flex justify-center text-center my-[50%] font-semibold text-base">Loading ...</div>
      ) : product ? (
        <div className="text-gray-800">
          <div className="font-bold text-base mx-6 my-6 cursor-pointer" onClick={() => redirectToList()}>
            Back To Products
          </div>
          <div className="flex flex-col justify-center text-center mt-10">
            <h1 className="font-bold text-5xl">{product.title}</h1>
          </div>
          <div className="mt-8 flex flex-col justify-center">
            <div className="flex justify-center">
              <img src={selectImage === "" || !selectImage ? product.thumbnail : selectImage} className="border rounded w-fit h-fit" alt="product thumbnail" />
            </div>
            <div className="mt-2 grid grid-cols-5 gap-2 mx-10">
              {product.images.map((image, index) => (
                <div key={index} className="cursor-pointer p-4" onClick={() => selectImageProduct(image)}>
                  <img src={image} className="border rounded w-[100px] h-[100px]" alt="images" />
                </div>
              ))}
            </div>
            <div className="border bg-slate-100 text-base mx-10 rounded p-3 mt-6">
              <h1 className="font-semibold text-xl text-center underline underline-offset-4">Details Product</h1>
              <div className="mt-8">
                <div className="grid grid-cols-2 gap-2 mb-3 ml-5">
                  <div>Name</div>
                  <div>: {product.title}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 ml-5">
                  <div>Description</div>
                  <div>: {product.description}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 ml-5">
                  <div>Price</div>
                  <div>: $ {product.price}</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 ml-5">
                  <div>Stock Availble</div>
                  <div>: {product.stock} pcs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-gray-900 flex justify-center text-center my-[50%] font-semibold text-base">No Product Found</div>
      )}
    </div>
  );
};

export default ProductDetail;
