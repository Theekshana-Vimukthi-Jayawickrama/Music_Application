import 'package:flutter/material.dart';

class About extends StatefulWidget {
  const About({super.key});

  @override
  State<About> createState() => _AboutState();
}

class _AboutState extends State<About> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Center(
              child: Container(
                padding: EdgeInsets.all(16.0),  // Optional: Add padding for better appearance
                child: const Text(
                  "🎶 Discover the Ultimate Music Companion! 🎶",
                  style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
                  textAlign: TextAlign.center, // Center align the text inside the Text widget
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(16.0), // Optional: Add padding for better appearance
              child: Text(
                "Unleash your musical potential with our all-in-one application! Whether you're a seasoned musician or just starting out, our app brings together all the notations, chords, and lyrics you need in one convenient place. Dive in and enjoy a seamless musical experience with us. Come join the fun and elevate your music journey! 🎸🎤🎹",
                style: TextStyle(fontSize: 25),
                textAlign: TextAlign.center, // Center align the text inside the Text widget
              ),
            ),
          ],
        ),
      ),
    );
  }
}
