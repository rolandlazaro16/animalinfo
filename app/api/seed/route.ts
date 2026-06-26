import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/mongodb';
import Animal from '@/lib/models/Animal';
import Feedback from '@/lib/models/Feedback';

const seedAnimals = [
  {
    name: 'Simba',
    species: 'Lion',
    breed: 'African Lion',
    age: 8,
    gender: 'Male',
    location: 'Serengeti Reserve',
    imageUrl: '',
    status: 'Healthy',
  },
  {
    name: 'Zara',
    species: 'Zebra',
    breed: 'Plains Zebra',
    age: 5,
    gender: 'Female',
    location: 'Masai Mara',
    imageUrl: '',
    status: 'Healthy',
  },
  {
    name: 'Kibo',
    species: 'Elephant',
    breed: 'African Bush Elephant',
    age: 25,
    gender: 'Male',
    location: 'Amboseli National Park',
    imageUrl: '',
    status: 'Needs Attention',
  },
  {
    name: 'Nala',
    species: 'Leopard',
    breed: 'African Leopard',
    age: 6,
    gender: 'Female',
    location: 'Kruger National Park',
    imageUrl: '',
    status: 'Healthy',
  },
  {
    name: 'Tembo',
    species: 'Rhinoceros',
    breed: 'Black Rhinoceros',
    age: 12,
    gender: 'Male',
    location: 'Ngorongoro Crater',
    imageUrl: '',
    status: 'Critical',
  },
  {
    name: 'Duma',
    species: 'Cheetah',
    breed: 'Southeast African Cheetah',
    age: 4,
    gender: 'Female',
    location: 'Serengeti Reserve',
    imageUrl: '',
    status: 'Healthy',
  },
  {
    name: 'Kiboko',
    species: 'Hippopotamus',
    breed: 'Common Hippopotamus',
    age: 15,
    gender: 'Male',
    location: 'Lake Manyara',
    imageUrl: '',
    status: 'Healthy',
  },
  {
    name: 'Twiga',
    species: 'Giraffe',
    breed: 'Masai Giraffe',
    age: 10,
    gender: 'Female',
    location: 'Tarangire National Park',
    imageUrl: '',
    status: 'Needs Attention',
  },
];

export async function POST() {
  try {
    await dbConnect();

    // Clear existing data
    await Animal.deleteMany({});
    await Feedback.deleteMany({});

    // Seed animals
    const animals = await Animal.insertMany(seedAnimals);

    // Create seed feedback
    const seedFeedback = [
      {
        animalId: animals[0]._id,
        animalName: animals[0].name,
        category: 'Health',
        severity: 'Low',
        title: 'Routine health check completed',
        description:
          'Simba completed his quarterly health check. All vitals are normal. Weight is stable at 190kg. Mane is full and healthy.',
        reporterName: 'Dr. Amani Mwangi',
        reporterEmail: 'amani@wildlife.org',
        status: 'Resolved',
      },
      {
        animalId: animals[2]._id,
        animalName: animals[2].name,
        category: 'Health',
        severity: 'High',
        title: 'Limping observed on front left leg',
        description:
          'Kibo was observed limping during morning patrol. The front left leg appears swollen near the ankle. Possible injury from terrain. Recommend veterinary examination.',
        reporterName: 'James Kariuki',
        reporterEmail: 'james@wildlife.org',
        status: 'Open',
      },
      {
        animalId: animals[1]._id,
        animalName: animals[1].name,
        category: 'Behavior',
        severity: 'Medium',
        title: 'Unusual isolation from herd',
        description:
          'Zara has been separating from the main herd for the past 3 days. She feeds alone and stays at the periphery. No visible injuries but behavior is atypical.',
        reporterName: 'Sarah Ochieng',
        reporterEmail: 'sarah@wildlife.org',
        status: 'In Review',
      },
      {
        animalId: animals[4]._id,
        animalName: animals[4].name,
        category: 'Health',
        severity: 'Critical',
        title: 'Signs of poaching-related injury',
        description:
          'Tembo was found with a wire snare around his rear left leg. The wound is infected and requires immediate veterinary intervention. Anti-poaching team has been notified.',
        reporterName: 'Dr. Fatima Hassan',
        reporterEmail: 'fatima@wildlife.org',
        status: 'Open',
      },
      {
        animalId: animals[3]._id,
        animalName: animals[3].name,
        category: 'Nutrition',
        severity: 'Low',
        title: 'Weight gain noted during monthly review',
        description:
          'Nala has gained approximately 3kg since last assessment. This is within healthy range and likely due to successful hunting season. Continue monitoring.',
        reporterName: 'Peter Ndung\'u',
        reporterEmail: 'peter@wildlife.org',
        status: 'Closed',
      },
      {
        animalId: animals[5]._id,
        animalName: animals[5].name,
        category: 'Behavior',
        severity: 'Low',
        title: 'Successful hunt observed',
        description:
          'Duma was observed making a successful hunt of Thomson\'s gazelle. Speed and agility appear excellent. No signs of distress or injury post-hunt.',
        reporterName: 'Grace Wanjiku',
        reporterEmail: 'grace@wildlife.org',
        status: 'Resolved',
      },
      {
        animalId: animals[7]._id,
        animalName: animals[7].name,
        category: 'Habitat',
        severity: 'Medium',
        title: 'Preferred feeding area shows drought stress',
        description:
          'The acacia grove where Twiga primarily feeds is showing significant drought stress. Trees are losing leaves earlier than seasonal norm. May need to monitor food availability.',
        reporterName: 'David Mwenda',
        reporterEmail: 'david@wildlife.org',
        status: 'Open',
      },
      {
        animalId: animals[6]._id,
        animalName: animals[6].name,
        category: 'General',
        severity: 'Low',
        title: 'New calf observed with Kiboko',
        description:
          'A new calf has been observed near Kiboko. The calf appears healthy and is staying close to the pod. This is a positive sign for the local hippopotamus population.',
        reporterName: 'Lucy Akinyi',
        reporterEmail: 'lucy@wildlife.org',
        status: 'Resolved',
      },
      {
        animalId: animals[2]._id,
        animalName: animals[2].name,
        category: 'Habitat',
        severity: 'High',
        title: 'Water source contamination near habitat',
        description:
          'Water testing at the primary waterhole in Kibo\'s territory shows elevated levels of agricultural runoff. This could affect the entire elephant herd. Urgent water treatment or alternative source needed.',
        reporterName: 'Dr. Amani Mwangi',
        reporterEmail: 'amani@wildlife.org',
        status: 'In Review',
      },
      {
        animalId: animals[0]._id,
        animalName: animals[0].name,
        category: 'Behavior',
        severity: 'Medium',
        title: 'Territorial marking increased',
        description:
          'Simba has increased territorial marking frequency. Two new male lions have been spotted near the pride boundary. Monitoring for potential conflict.',
        reporterName: 'James Kariuki',
        reporterEmail: 'james@wildlife.org',
        status: 'Open',
      },
    ];

    await Feedback.insertMany(seedFeedback);

    return NextResponse.json({
      success: true,
      message: `Seeded ${animals.length} animals and ${seedFeedback.length} feedback entries`,
      data: {
        animalsCreated: animals.length,
        feedbackCreated: seedFeedback.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
