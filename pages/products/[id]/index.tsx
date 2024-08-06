import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import magento from "@/apollo-magento";
import { gql } from "@apollo/client";
import Link from "next/link";
import Head from "next/head";

const notify = () => toast.success("Added item to cart");

export default function ProductDetailsPage(
  params: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [quantity, setQuantity] = useState(1);
  const [option, setOption] = useState("");
  const [product, setProduct] = useState(params.product);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(Number(event.target.value));
  };

  const handleOptionChange = (event: SelectChangeEvent) => {
    setOption(event.target.value);
  };

  const images = product.media_gallery.map(({ url }: { url: string }) => url);

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Box
        className="space-y-5"
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          bgcolor: "darkkhaki",
          padding: 5,
        }}
      >
        <Grid
          container
          sx={{ display: "flex", alignItems: "center" }}
          spacing={1}
        >
          <Grid xs={12} item md={6} mb="2rem">
            <ImageCarousel images={images} />
          </Grid>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                ${product.price_range.minimum_price.regular_price.value}
              </Typography>
              {params.product.variants && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel color="warning" id="option-label">
                    Choose an Option
                  </InputLabel>
                  <Select
                    color="warning"
                    labelId="option-label"
                    id="option"
                    value={option}
                    label="Choose an Option"
                    onChange={handleOptionChange}
                  >
                    {params.product.variants.map((variant, i) => (
                      <MenuItem
                        onClick={() => setProduct(variant.product)}
                        key={variant.product.sku + i}
                        value={variant.product.sku}
                      >
                        {variant.product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <FormControl sx={{ mr: 2, width: "30%" }}>
                  <InputLabel color="warning" id="quantity-label">
                    Quantity
                  </InputLabel>
                  <Select
                    color="warning"
                    labelId="quantity-label"
                    id="quantity"
                    value={quantity.toString()}
                    label="Quantity"
                    onChange={handleQuantityChange}
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <MenuItem key={qty} value={qty}>
                        {qty}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* I couldn't find a way to get qty from magento. I can't disable the button */}
                <Button
                  onClick={notify}
                  variant="contained"
                  color="warning"
                  fullWidth
                >
                  Add to Cart
                </Button>
                <Toaster />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <div>
          <Typography variant="h4" className="font-bold">
            Specifications
          </Typography>
          <div>
            {product.categories.length > 0 && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Categories
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul>
                    {product.categories.map((category, i) => (
                      <li key={category.name + i}>{category.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {product.rating_summary !== 0 && (
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">Rating</div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {product.rating_summary} / 100
                </div>
              </div>
            )}
            {product.related_products.length > 0 && (
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">
                  Related Products
                </div>
                <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul>
                    {product.related_products.map((product) => (
                      <li key={product.url_key}>
                        <Link
                          target="_blank"
                          href={`/products/${product.url_key}`}
                        >
                          {product.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Review Count
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.review_count}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">SKU</div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.sku}
              </div>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Stock Status
              </div>
              <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {product.stock_status}
              </div>
            </div>
          </div>
        </div>
        <div>
          <Typography className="font-bold" variant="h4">
            Description
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: product.description.html }} />
        </div>
      </Box>
    </>
  );
}

// getStaticPaths is good for seo
// using because performance is stated to be important
export const getStaticPaths = async () => {
  const { data } = await magento.query({
    query: gql`
      query fetchUrls {
        products(search: "") {
          items {
            url_key
          }
        }
      }
    `,
  });

  const paths = data.products.items.map(({ url_key }: { url_key: string }) => ({
    params: { id: url_key },
  }));

  return {
    paths,
    fallback: true,
  };
};

// TODO: fix typing
export const getStaticProps: GetStaticProps<{
  product: {
    categories: Array<{ name: string; product_count: number }>;
    configurable_options: Array<{ values: Array<{ label: string }> }>;
    description: { html: string };
    media_gallery: Array<{ url: string }>;
    name: string;
    price_range: {
      minimum_price: {
        regular_price: {
          value: number;
        };
      };
    };
    rating_summary: number;
    related_products: Array<{
      name: string;
      url_key: string;
      media_gallery: Array<{ url: string }>;
    }>;
    review_count: number;
    sku: string;
    stock_status: string;
    variants: Array<{
      product: {
        name: string;
        sku: string;
        categories: string[];
        description: { html: string };
      };
      media_gallery: Array<{ url: string }>;
      name: string;
      price_range: {
        minimum_price: {
          regular_price: {
            value: number;
          };
        };
      };
      rating_summary: number;
      sku: string;
      stock_status: string;
    }>;
  };
}> = async (context: { params: { id: string } }) => {
  const { id } = context.params;
  const query = gql`
    query product($id: String!) {
      products(filter: { url_key: { eq: $id } }) {
        items {
          stock_status
          review_count
          sku
          rating_summary
          categories {
            name
            product_count
          }
          name
          description {
            html
          }
          price_range {
            minimum_price {
              regular_price {
                value
              }
            }
          }
          media_gallery {
            url
          }
          related_products {
            name
            url_key
            media_gallery {
              url
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              values {
                label
              }
            }
            variants {
              product {
                name
                description {
                  html
                }
                sku
                price_range {
                  minimum_price {
                    regular_price {
                      value
                    }
                  }
                }
                media_gallery {
                  url
                }
                stock_status
                review_count
                sku
                rating_summary
                categories {
                  name
                  product_count
                }
                related_products {
                  name
                  url_key
                  media_gallery {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await magento.query<{
    products: {
      items: Array<{
        categories: Array<{ name: string; product_count: number }>;
        configurable_options: Array<{ values: Array<{ label: string }> }>;
        description: { html: string };
        media_gallery: Array<{ url: string }>;
        name: string;
        price_range: {
          minimum_price: {
            regular_price: {
              value: number;
            };
          };
        };
        rating_summary: number;
        related_products: Array<{
          name: string;
          url_key: string;
          media_gallery: Array<{ url: string }>;
        }>;
        review_count: number;
        sku: string;
        stock_status: string;
        variants: Array<{
          product: {
            name: string;
            sku: string;
            categories: string[];
            description: { html: string };
          };
          media_gallery: Array<{ url: string }>;
          name: string;
          price_range: {
            minimum_price: {
              regular_price: {
                value: number;
              };
            };
          };
          rating_summary: number;
          sku: string;
          stock_status: string;
        }>;
      }>;
    };
  }>({ query, variables: { id } });

  return {
    props: {
      product: data.products.items[0],
    },
    revalidate: 60 * 60,
  };
};
