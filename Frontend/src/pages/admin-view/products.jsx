import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin-slice/products";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductList from "../../components/admin-view/product-list";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
        //   console.log(data);
        if(data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData)
            setOpenCreateProductDialog(false)
            setCurrentEditedId(null)
        }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setOpenCreateProductDialog(false);
            setFormData(initialFormData);
            toast({
              title: "Product added Successfully!",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId){
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
        if(data?.payload.success){
            dispatch(fetchAllProducts())
        }
    })
  }

  function isFormValid(){
    return Object.keys(formData).map(key => formData[key] !== '').every(item => item)
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productList, "fetched data");

  return (
    <>
      <div className="mb-5 flex justify-end w-full">
        <Button
          onClick={() => setOpenCreateProductDialog(true)}
          className="bg-black text-white hover:bg-black border-0 rounded"
        >
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              // eslint-disable-next-line react/jsx-key
              <AdminProductList
                setFormData={setFormData}
                setOpenCreateProductDialog={setOpenCreateProductDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEditMode = {currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              onSubmit={onSubmit}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              isBtnDisabled = {!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
