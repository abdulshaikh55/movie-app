import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />

      {moviesLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      ) : moviesError ? (
        <Text> Error: {moviesError?.message}</Text>
      ) : (
        <FlatList
          key={"movies-grid"}
          data={movies}
          renderItem={({ item }) => (
            <MovieCard {...item} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10
          }}
          className="mt-2 pb-32"
          contentContainerStyle={{
            minHeight: "100%",
            paddingBottom: 10,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <Image source={icons.logo} className="w-12 h-20 mt-20 mb-5 mx-auto" />
              <View className="flex-1 mt-5 mb-2">
                <SearchBar onPress={() => router.push("/search")} placeholder="Search for a movie" />
              </View>
            </>
          }
        />
      )}
    </View>
  );
}
