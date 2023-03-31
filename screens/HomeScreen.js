import {
  Text,
  FlatList,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import Main from "../components/Main";
import { Button } from "react-native-paper";
import {
  getAllItems,
  createItemsTable,
  addItem,
  clearItemsTable,
  db,
} from "../helpers/db";

const ItemDivider = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "lightgray",
      }}
    />
  );
};

function MenuItem({ name, price, category, description, image }) {
  return (
    <View style={styles.menuItemContainer}>
      <View style={styles.menuItemMain}>
        <Text style={styles.menuItemName}>{name}</Text>
        <Text style={styles.menuItemDescription}>{description}</Text>
        <Text style={styles.menuItemPrice}>$ {price}</Text>
      </View>
      <View>
        <Image
          style={styles.menuImage}
          source={{
            uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`,
          }}
        />
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const [apiData, setApiData] = useState([]);

  function insertItemsToDb(items) {
    for (item of items) {
      addItem(item);
    }
  }

  useEffect(() => {
    createItemsTable();
    // clearItemsTable();
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM items",
        [],
        (txObj, resultSet) => {
          if (!resultSet.rows._array || resultSet.rows._array.length <= 0) {
            fetch(
              "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
            )
              .then((data) => data.json())
              .then((d) => {
                insertItemsToDb(d.menu);
                setApiData(d.menu);
              });
          } else {
            setApiData(resultSet.rows._array);
          }
        },
        (txObj, error) => {
          console.log(error);
        }
      );
    });

    if (!apiData || apiData.length <= 0) {
    }
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Main />
        <View style={styles.orderView}>
          <Text style={styles.orderText}>Order For Delivery!</Text>
          <View style={styles.orderViewButtons}>
            <Button
              style={styles.changeButton}
              mode="outlined"
              compact={true}
              textColor="#777"
            >
              Starters
            </Button>
            <Button
              style={styles.changeButton}
              mode="outlined"
              compact={true}
              textColor="#777"
            >
              Mains
            </Button>
            <Button
              style={styles.changeButton}
              mode="outlined"
              compact={true}
              textColor="#777"
            >
              Desserts
            </Button>
            <Button
              style={styles.changeButton}
              mode="outlined"
              compact={true}
              textColor="#777"
            >
              Drinks
            </Button>
          </View>
        </View>
        <ItemDivider />
        <FlatList
          ItemSeparatorComponent={ItemDivider}
          data={apiData}
          renderItem={({ item }) => (
            <MenuItem
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              category={item.category}
            />
          )}
          keyExtractor={(item) => item.name}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuItemContainer: {
    flexDirection: "row",
  },
  menuItemMain: {
    width: "70%",
    padding: 10,
  },
  menuItemName: {
    fontSize: 20,
  },
  menuItemDescription: {
    color: "#777",
    marginTop: 5,
    minHeight: 60,
  },
  menuItemPrice: {
    fontSize: 18,
    marginTop: 10,
  },
  menuImage: {
    width: 100,
    height: 110,
    marginTop: 10,
    borderRadius: 20,
  },
  orderView: {},
  orderViewButtons: {
    flexDirection: "row",
  },
  changeButton: {
    width: 80,
    marginBottom: 20,
    margin: 5,
  },
  orderText: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
  },
});
