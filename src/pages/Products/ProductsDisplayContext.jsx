import React, {createContext, useState} from "react";

export const ProductsContextStore = createContext({})

const ProductsDisplayProvider = ({children}) => {
    const [displayProducts, setDisplayProducts] = useState({list:false, table:true})

    const handleListDisplay = () => setDisplayProducts({list: true, table: false})
    const handleTableDisplay = () => setDisplayProducts({list: false, table: true})


    return <ProductsContextStore.Provider value={{displayProducts, handleTableDisplay, handleListDisplay}}>
        {children}
    </ProductsContextStore.Provider>
}

export default ProductsDisplayProvider