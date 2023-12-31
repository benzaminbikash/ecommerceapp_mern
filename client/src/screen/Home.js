import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState } from "react";
import SearchBox from "../components/SearchBox";
import Carousel from "react-native-snap-carousel";
import { SIZE, images } from "../constants/constants";
import { useGetCategoryListQuery } from "../redux/Api/categoryApi";
import CategoryList from "../components/CategoryList";
import { useGetProductListQuery } from "../redux/Api/productApi";
import ProductList from "../components/ProductList";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "../components/CustomModal";
const Home = () => {
  const { data: categoryData, isLoading } = useGetCategoryListQuery();
  const { data: productData } = useGetProductListQuery();
  const [isVisible, setIsVisible] = useState(false);
  const handleVisible = () => {
    setIsVisible(!isVisible);
  };
  return isLoading ? (
    <View style={styles.loading}>
      <ActivityIndicator size={35} color="white" />
    </View>
  ) : (
    <SafeAreaView style={styles.main}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBox />
        {/* image banner */}
        <View>
          <Carousel
            data={images}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.sliderImage} key={index}>
                  <Image source={item} style={styles.image} />
                </View>
              );
            }}
            sliderWidth={SIZE.WIDTH}
            itemWidth={SIZE.WIDTH}
            autoplay={true}
            loop={true}
          />
        </View>
        {/* category */}
        <Text style={styles.title}>Categories</Text>
        <View>
          <ScrollView horizontal>
            {categoryData?.data.map((item) => {
              return <CategoryList item={item} />;
            })}
          </ScrollView>
        </View>
        {/* product */}
        <View style={styles.filterbox}>
          <Text style={styles.title}>Products</Text>
          <View>
            <TouchableOpacity onPress={handleVisible}>
              <Ionicons name="filter" size={20} color="white" />
            </TouchableOpacity>
            <Modal transparent animationType="slide" visible={isVisible}>
              <CustomModal close={handleVisible} />
            </Modal>
          </View>
        </View>
        <View style={styles.productlist}>
          {productData?.data.map((item) => {
            return <ProductList item={item} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  loading: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 5,
  },
  sliderImage: {
    width: "100%",
    height: 230,
  },
  image: {
    width: SIZE.WIDTH,
    height: 230,
  },
  productlist: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    alignItems: "center",
  },
});
