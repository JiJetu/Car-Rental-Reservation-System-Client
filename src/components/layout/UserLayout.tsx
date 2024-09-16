import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { createElement } from "react";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: createElement(icon),
  label: `nav ${index + 1}`,
}));

const user = {
  role: undefined,
};

const UserLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {user.role === "user" ? (
        <></>
      ) : (
        <div
          style={{
            color: "white",
            fontSize: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Car Rental Shop</h1>
        </div>
      )}
      {user.role === "user" ? (
        <Sider
          style={
            user.role
              ? { minHeight: "100%", width: "100%" }
              : { height: "100%", width: "0" }
          }
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "3rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Car Rental Shop</h1>
          </div>
          {user.role === "user" ? (
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          ) : (
            ""
          )}
        </Sider>
      ) : (
        <></>
      )}
      <Layout>
        <Header
          style={{
            padding: 0,
            color: "white",
            fontSize: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "red",
            whiteSpace: "nowrap",
            overflow: "auto",
          }}
        >
          <h1>Navbar</h1>
          <h1>Navbar</h1>
          <h1>Navbar</h1>
          <h1>Navbar</h1>
          <h1>Navbar</h1>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              fontSize: "3rem",
            }}
          >
            <h1>Main contain should go here</h1>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
