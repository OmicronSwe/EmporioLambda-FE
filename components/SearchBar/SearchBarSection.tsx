import React from "react";
import SearchBar from "./SearchBar";

class SearchBarSection extends React.Component<
  { categories: string[]; category: string; name: string; maxPrice: number; minPrice: number },
  { category: string }
> {
  constructor(props) {
    super(props);

    const { category } = this.props;
    this.state = {
      category: category || "All categories",
    };
  }

  changeCategory = async (category: string) => {
    // Intended to run on the change of every form element
    this.setState({
      category,
    });
  };

  onSearch = async () => {
    const { category } = this.state;
    let searchInput: string = "";

    const productValue: string = (document.getElementById("productValue") as HTMLInputElement)
      .value;
    const minPriceValue: string = (document.getElementById("minPriceValue") as HTMLInputElement)
      .value;
    const maxPriceValue: string = (document.getElementById("maxPriceValue") as HTMLInputElement)
      .value;

    if (productValue) {
      searchInput += `name=${productValue}&`;
    }

    if (minPriceValue) {
      searchInput += `minprice=${minPriceValue}&`;
    }

    if (maxPriceValue) {
      searchInput += `maxprice=${maxPriceValue}&`;
    }

    if (category && category !== "All categories") {
      searchInput += `category=${category}&`;
    }

    searchInput = searchInput.slice(0, -1); // remove last &

    window.location.href = `/search?${encodeURI(searchInput)}`;
  };

  render() {
    const { categories, name, maxPrice, minPrice } = this.props;
    const { category } = this.state;
    return (
      <>
        <SearchBar
          categories={categories}
          category={category}
          changeCategory={this.changeCategory}
          onSearch={this.onSearch}
          name={name}
          maxPrice={maxPrice}
          minPrice={minPrice}
        />
      </>
    );
  }
}

export default SearchBarSection;
