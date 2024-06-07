import 'dart:convert';
import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:music_app/SongPage.dart';
import 'package:music_app/models/About.dart';
import 'package:music_app/models/Song.dart';
import 'package:music_app/models/song_provider.dart';
import 'package:provider/provider.dart';

class HeroSection extends StatelessWidget {
  const HeroSection({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: const Color(0xFF1E1E2C),
        appBar: AppBar(
          title: const Text(
            "Enjoy with Music",
            style: TextStyle(
              color: Colors.white,
            ),
          ),
          backgroundColor: const Color.fromARGB(255, 7, 6, 6),
          elevation: 50.0,
          leading: Builder(
            builder: (context) => IconButton(
              icon: const Icon(
                Icons.list_sharp,
                color: Colors.white,
                size: 35,
              ),
              onPressed: () {
                Scaffold.of(context).openDrawer();
              },
            ),
          ),
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              const DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.blue,
                ),
                child: Text(
                  'Menu',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 24,
                  ),
                ),
              ),
              ListTile(
                leading: const Icon(Icons.info),
                title: const Text('About'),
                onTap: () {
                  Navigator.push(context, MaterialPageRoute(builder: (context) => About()));
                  // Navigate to About page
                },
              ),
              ListTile(
                leading: const Icon(Icons.card_giftcard),
                title: const Text('Donate'),
                onTap: () {
                  Navigator.pop(context);
                  // Navigate to Donate page
                },
              ),
              ListTile(
                leading: const Icon(Icons.privacy_tip_rounded),
                title: const Text('Privacy & Policies'),
                onTap: () {
                  Navigator.pop(context);
                  // Navigate to Donate page
                },
              ),
            ],
          ),
        ),
        body: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(4.0),
              child: SizedBox(
                height: 50,
                width: double.infinity,
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    const SizedBox(width: 20.0, height: 100.0),
                    const Text(
                      'Welcome to',
                      style: TextStyle(fontSize: 28.0, color: Colors.white70),
                    ),
                    const SizedBox(width: 20.0, height: 100.0),
                    DefaultTextStyle(
                      style: const TextStyle(
                          fontSize: 32.0,
                          fontFamily: 'Horizon',
                          color: Colors.white),
                      child: AnimatedTextKit(
                        animatedTexts: [
                          RotateAnimatedText('Tone Book'),
                          RotateAnimatedText('Tone Book'),
                          RotateAnimatedText('Tone Book'),
                        ],
                        totalRepeatCount: 1000,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                width: double.infinity,
                height: 50,
                decoration: const BoxDecoration(color: Color(0xFF252525)),
                child: const Center(
                  child: Text(
                    "ALL SONGS",
                    style: TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              ),
            ),
            Expanded(child: SecondWidget()),
          ],
        ),
      ),
    );
  }
}

class SecondWidget extends StatefulWidget {
  @override
  _SecondWidgetState createState() => _SecondWidgetState();
}

class _SecondWidgetState extends State<SecondWidget> {
  List<Song> songs = [];
  List<Song> foundSongs = [];

  @override
  void initState() {
    super.initState();
    fetchItems();
  }

  Future<void> fetchItems() async {
    var url = Uri.parse("http://192.168.43.220:8080/api/v1/song/get/all");
    late http.Response response;
    try {
      final songDataProvider =
          Provider.of<SongProvider>(context, listen: false);
      response = await http.get(url);

      if (response.statusCode == 200) {
        List<dynamic> data = jsonDecode(response.body);
        List<Song> fetchedSongs = [];
        for (var item in data) {
          var name = item['name'];
          var id = item['id'];
          var sinhalaName = item['sinhalaName'];
          var artistPhotoData = item['artistPhoto']['data'];
          var lyricsData = item['lyrics']['data'];
          var songCodeData = item['songCode']['data'];
          var songNotationData = item['songNotation']['data'];
          var codeCredit = item['songCode']['credit'];
          var notationCredit = item['songNotation']['credit'];

          Song song = Song(
            name,
            id,
            sinhalaName,
            artistPhotoData,
            lyricsData,
            songCodeData,
            songNotationData,
            codeCredit,
            notationCredit,
          );
          fetchedSongs.add(song);
        }
        songDataProvider.addSongs(fetchedSongs);
        setState(() {
          songs = fetchedSongs;
          foundSongs = fetchedSongs;
        });
      } else {
        throw Exception("Something went wrong, ${response.statusCode}");
      }
    } catch (e) {
      print(e);
      throw Exception(e.toString());
    }
  }

  void _runFilter(String enteredKeyword) {
    List<Song> results = [];
    if (enteredKeyword.isEmpty) {
      results = songs;
    } else {
      results = songs
          .where((item) =>
              item.name.toLowerCase().contains(enteredKeyword.toLowerCase()))
          .toList();
    }

    setState(() {
      foundSongs = results;
    });
  }

  Future<void> _handleRefresh() async {
    await Future.delayed(const Duration(seconds: 2));
    await fetchItems();
  }

  @override
  Widget build(BuildContext context) {
    return RefreshIndicator(
      onRefresh: _handleRefresh,
      child: Column(
        children: [
          const SizedBox(
            height: 5,
          ),
          Padding(
            padding: const EdgeInsets.all(10.0),
            child: TextField(
              onChanged: (value) => _runFilter(value),
              style: const TextStyle(color: Colors.white),
              decoration: const InputDecoration(
                  labelText: 'Search',
                  labelStyle: TextStyle(color: Colors.white),
                  suffixIcon: Icon(Icons.search, color: Colors.white)),
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Expanded(
            child: foundSongs.isNotEmpty
                ? ListView.builder(
                    itemCount: foundSongs.length,
                    itemBuilder: (BuildContext context, int index) {
                      return Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Container(
                          decoration: const BoxDecoration(
                              color: Color.fromARGB(255, 15, 15, 14)),
                          child: ListTile(
                            leading: Image.memory(
                              base64.decode(foundSongs[index].artistPhotoData),
                              width: 50,
                              height: 50,
                            ),
                            title: Text(
                              foundSongs[index].name,
                              style: const TextStyle(
                                  color: Colors.white, fontSize: 20),
                            ),
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      Songpage(data: foundSongs[index].id),
                                ),
                              );
                            },
                          ),
                        ),
                      );
                    },
                  )
                : const Center(
                    child: Text('Waiting for results',
                        style: TextStyle(color: Colors.white))),
          ),
        ],
      ),
    );
  }
}
