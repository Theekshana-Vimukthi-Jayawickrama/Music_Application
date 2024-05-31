import 'dart:async';
import 'package:flutter/material.dart';
import 'package:music_app/HeroSection.dart';
import 'package:music_app/models/song_provider.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => SongProvider()),
      ],
      child: const MaterialApp(
        debugShowCheckedModeBanner: false,
        home: MyApp(),
      ),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      title: "new app",
      home: SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Timer(const Duration(seconds: 3), () {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => HeroSection()),
        );
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Center(
            child: SizedBox(
                width: MediaQuery.of(context).size.width,
                height: double.infinity,
                child: Image.asset(
                  "assets/logo.png",
                  fit: BoxFit.fill,
                ))),
      ),
    );
  }
}
