package main;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Algorithm {

	private Algorithm() {
		// Private constructor to prevent instantiation.
	}

	/**
	 * Runs the FizzBuzz game starting from a given number.
	 * <p>
	 * For each number starting from {@code x}:
	 * <ul>
	 * <li>Prints "Fizz" if divisible by 3</li>
	 * <li>Prints "Buzz" if divisible by 5</li>
	 * <li>Prints "FizzBuzz" if divisible by both 3 and 5</li>
	 * <li>Otherwise prints the number itself</li>
	 * </ul>
	 * <p>
	 * The method pauses for 300 milliseconds between each output.
	 *
	 * @param start the starting number
	 */
	public static void fizzBuzz(int start) {
		boolean passed = false;
		for (int i = start;; i++) {
			if (i % 3 == 0) {
				System.out.print("Fizz");
				passed = true;
			}
			if (i % 5 == 0) {
				System.out.print("Buzz");
				passed = true;
			}
			if (!passed) {
				System.out.println(i);
			} else {
				System.out.println();
			}
			passed = false;
			// This is not part of the exercise, but to see the results properly
			try {
				Thread.sleep(200);
			} catch (InterruptedException e) {
				e.printStackTrace();
				Thread.currentThread().interrupt();
			}
		}
	}

	/**
	 * Checks whether a given string is a palindrome.
	 * <p>
	 * The method ignores non-alphanumeric characters and is case-insensitive.
	 * </p>
	 *
	 * @param word the string to check
	 * @return {@code true} if the string is a palindrome, {@code false} otherwise
	 */
	public static boolean isPalindrom(String word) {
		boolean result = false;
		if (word != null) {
			String cleanWord = word.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
			StringBuilder sb = new StringBuilder(cleanWord);
			result = sb.reverse().toString().equals(cleanWord);
		}
		return result;
	}

	/**
	 * Sorts a list of integers using the QuickSort algorithm.
	 *
	 * @param sequences the list of integers to be sorted
	 * @return a new list containing the sorted integers; returns an empty list if
	 *         {@code sequences} is {@code null}
	 */
	public static List<Integer> quickSort(List<Integer> sequences) {
		if (sequences == null) {
			return Collections.emptyList();
		}
		int len = sequences.size();
		if (len == 0 || len == 1) {
			// it’s already sorted.
			return sequences;
		}

		// Choose a pivot
		Integer pivot = sequences.get(len - 1);
		sequences.remove(len - 1);
		// Split the list into: Left: elements ≤ pivot Right: elements > pivot
		List<Integer> leftArray = new ArrayList<>();
		List<Integer> rightArray = new ArrayList<>();

		sequences.forEach(element -> {
			if (element > pivot) {
				rightArray.add(element);
			} else {
				leftArray.add(element);
			}
		});

		List<Integer> result = new ArrayList<>();
		result.addAll(quickSort(leftArray));
		result.add(pivot);
		result.addAll(quickSort(rightArray));
		return result;

	}

	/**
	 * Performs an in-place QuickSort on the given list of integers.
	 * 
	 * @param sequences the list of integers to sort
	 */
	public static void inPlaceQuickSort(List<Integer> sequences) {
		if (sequences != null) {
			List<Integer> sortedArray = quickSort(sequences);
			sequences.clear();
			sequences.addAll(sortedArray);
		}
	}

}
