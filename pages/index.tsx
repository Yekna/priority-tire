import Image from "next/image";
import { Inter } from "next/font/google";
import { Typography } from "@mui/material";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { gql } from "@apollo/client";
import client from "@/apollo";
import magento from "@/apollo-magento";
import Rebates from "@/components/Rebates";
import Product from "@/components/Product";
import Slider from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Promotion from "@/components/Promotion";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  rebates,
  popularProducts,
  promotions,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Priority Tire</title>
      </Head>
      <main
        className={`flex flex-col items-center gap-5 justify-between ${inter.className}`}
      >
        <section className="hero w-full">
          {/* use different image on resolutions over 768px */}
          <picture>
            <source srcSet="/hero.jpg" media="(min-width: 768px)" />
            <Image
              className="w-full"
              src="/hero-mobile.jpg"
              width={5000}
              height={5000}
              alt="hero"
            />
          </picture>
        </section>
        <section className="promotion max-w-[1280px] space-y-5">
          <Rebates rebates={rebates} />
          <Typography variant="h2" className="text-center text-xl sm:text-3xl">
            Save Now With Our Promotions
          </Typography>
          <ul className="flex gap-5">
            {promotions.map((promotion, i) => (
              <li key={i}>
                <Promotion promotion={promotion} />
              </li>
            ))}
          </ul>
        </section>
        <section className="popular-products w-4/5 max-w-[1280px] space-y-5">
          <Typography variant="h2" className="text-center text-xl sm:text-3xl">
            Popular Products
          </Typography>
          <Slider
            additionalTransfrom={0}
            arrows
            centerMode={false}
            draggable
            focusOnSelect={false}
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 100000,
                  min: 1280,
                },
                items: 3,
              },
              tablet: {
                breakpoint: {
                  max: 1280,
                  min: 768,
                },
                items: 2,
              },
              mobile: {
                breakpoint: {
                  max: 768,
                  min: 0,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            slidesToSlide={1}
            swipeable
          >
            {popularProducts.map((product) => (
              <Product key={product.url_key} product={product} />
            ))}
          </Slider>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<{
  rebates: {
    dateTo: string;
    dateFrom: string;
    image: { id: string };
    slug: string;
    title: string;
    imageUrl: string;
  }[];
  popularProducts: Array<{
    name: string;
    url_key: string;
    price_range: {
      minimum_price: {
        regular_price: {
          value: string;
        };
      };
    };
    image: {
      url: string;
    };
  }>;
  promotions: Array<{ content: string; image: { url: string } }>;
}> = async () => {
  const rebatesQ = gql`
    query Rebates {
      rebates {
        title
        slug
        dateTo
        dateFrom
        image {
          id
        }
      }
    }
  `;

  const promotionsQ = gql`
    query Promotions {
      promotions {
        content
        image {
          url
        }
      }
    }
  `;

  const {
    data: { promotions },
  } = await client.query<{
    promotions: Array<{ content: string; image: { url: string } }>;
  }>({ query: promotionsQ });

  const { data } = await client.query<{
    rebates: {
      title: string;
      slug: string;
      dateTo: string;
      dateFrom: string;
      image: { id: string };
    }[];
  }>({ query: rebatesQ });

  const { data: images } = await client.query<{
    assets: Array<{ url: string }>;
  }>({
    query: gql`
      query GetImages($id: [ID]) {
        assets(where: { id_in: $id }) {
          url
        }
      }
    `,
    variables: {
      id: data.rebates.map((rebate) => rebate.image.id),
    },
  });

  const rebates = data.rebates.map((rebate, i) => ({
    ...rebate,
    imageUrl: images.assets[i].url,
  }));

  const popularProductsQ = gql`
    query popularProducts {
      products(search: "", pageSize: 15) {
        items {
          name
          url_key
          price_range {
            minimum_price {
              regular_price {
                value
              }
            }
          }
          image {
            url
          }
        }
      }
    }
  `;

  const {
    data: {
      products: { items: popularProducts },
    },
  } = await magento.query({ query: popularProductsQ });

  return {
    props: {
      rebates,
      popularProducts,
      promotions,
    },
  };
};
