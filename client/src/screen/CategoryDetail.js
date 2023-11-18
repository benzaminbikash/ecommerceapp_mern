import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { useCategoryProductQuery } from "../redux/Api/productApi";
import ProductList from "../components/ProductList";

const CategoryDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  const { data: Apidata, isLoading } = useCategoryProductQuery(item._id);
  return (
    <View style={styles.main}>
      <CustomHeader title={item.title} back={true} />
      {isLoading && <ActivityIndicator color="white" size={30} />}
      {Apidata?.data.length === 0 ? (
        <View style={styles.noData}>
          <Text style={styles.text}>No Data</Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row", flexWrap: "nowrap" }}>
          {Apidata?.data.map((d) => (
            <ProductList item={d} />
          ))}
        </View>
      )}
    </View>
  );
};

export default CategoryDetail;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  text: {
    color: "white",
  },
  second: {
    padding: 10,
  },
  noData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
