import { useFetch } from "@/hooks/useFetch";
import { ExpandLess, ExpandMore, Menu } from "@mui/icons-material";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
// import { useMediaQuery } from "usehooks-ts";

const Hamburger = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(-1);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const { data, isFetching, error } = useFetch<{
    categories: {
      items: Array<{
        name: string;
        uid: string;
        product_count: number;
        children: Array<{ name: string; uid: string; product_count: number }>;
      }>;
    };
  }>(`
    query fetchCategories {
      categories(filters: {parent_category_uid: {eq: "Mg=="}}){
        items {
          name
          uid
          product_count
          children {
            name
            uid
            product_count
          }
        }
      }
    }`);

  if (!data) return;

  const values = data.data.categories.items.map(({ children }) =>
    children.reduce((sum, { product_count }) => sum + product_count, 0),
  );

  return isMobile ? (
    <>
      <IconButton onClick={() => setIsDrawerOpen(true)} aria-label="menu">
        <Menu />
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List className="w-[300px]">
          {data.data.categories.items.map(
            ({ name, uid, children, product_count }, i) =>
              children.length || product_count ? (
                <>
                  <ListItemButton
                    onClick={() => setId((id) => (i === id ? -1 : i))}
                    key={uid}
                  >
                    <ListItemText primary={name + ` (${values[i]})`} />
                    {i === id ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse
                    key={`${uid} child`}
                    in={id === i}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List>
                      {children.map((child) => (
                        <ListItemButton
                          sx={{ pl: 4 }}
                          key={`${uid} button ${id}`}
                        >
                          <ListItemText
                            primary={
                              child.name +
                              ` (${child.product_count || product_count})`
                            }
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItemButton key={uid}>
                  <ListItemText primary={name} />
                </ListItemButton>
              ),
          )}
        </List>
      </Drawer>
    </>
  ) : (
    <List className="flex">
      {data.data.categories.items.map(({ name, uid, children }, i) =>
        children.length > 0 ? (
          <div className="flex flex-col relative" key={uid}>
            <ListItemButton
              selected={id === i}
              onBlur={() => setId(-1)}
              onClick={() => setId((id) => (i === id ? -1 : i))}
            >
              <ListItemText primary={name + ` (${values[i]})`} />
              {id === i ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse
              className="absolute top-[100%] bg-[#f5f5f5]"
              key={uid + " child"}
              in={id === i}
              timeout="auto"
              unmountOnExit
            >
              <List>
                {children.map((child, id) => (
                  <ListItemButton sx={{ pl: 4 }} key={uid + " button " + id}>
                    <ListItemText
                      primary={child.name + ` (${child.product_count})`}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ) : (
          <ListItemButton key={uid}>
            <ListItemText primary={name} />
          </ListItemButton>
        ),
      )}
    </List>
  );
};

export default Hamburger;
