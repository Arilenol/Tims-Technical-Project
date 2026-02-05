package main;

import java.util.ArrayList;
import java.util.List;

public class Main {

	public static void main(String[] args) {
//		Algorithm.fizzBuzz(1);
		
//		System.out.println(Algorithm.isPalindrom("kayak"));
		
		List<Integer> test = List.of(9, 2, 1, 9, 19, 12, 23, 11, 2);
		
		List<Integer> testB = new ArrayList<>();
		
		test.forEach(testB::add);
		
		
		
		System.out.println(Algorithm.quickSort(testB));
		
	}

}
