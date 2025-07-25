import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const { data: movies, loading, error } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full" />

      {loading || trendingLoading ? (
        <ActivityIndicator
          size={"large"}
          color={"#0000ff"}
          className="mt-10 self-center"
        />
      ) : error || trendingError ? (
        <Text> Error: {error?.message || trendingError?.message} </Text>
      ) : (
        <View>
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
                  {trendingMovies && (
                    <View className="mt-10">
                      <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>
                      <FlatList
                        data={trendingMovies}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className=" w-4" />}
                        renderItem={({ item, index }) => (
                          <TrendingCard movie={item} index={index} />
                        )}
                        keyExtractor={(item) => item.movie_id.toString()}
                        style={{ marginBottom: 20 }}
                      />
                      <Text className="text-lg text-white font-bold  mt-5 mb-3">Latest Movies</Text>
                    </View>
                  )}
                </View>
              </>
            }
          />
        </View>
      )}
    </View>
  );
}
