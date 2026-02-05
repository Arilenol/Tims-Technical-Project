package test.jUnit;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import main.Algorithm;

public class TestAlgorithm {

	@Test
	public void testIsPalindrom() {

		String myWord = "kayak";
		String myWord2 = "abba";
		String myWord3 = "A man, a plan, a canal: Panama	";
		String myWord4 = "tims";
		String myWord5 = "abab";

		// Test if the words are palindromes

		assertTrue(Algorithm.isPalindrom(myWord));
		assertTrue(Algorithm.isPalindrom(myWord2));
		assertTrue(Algorithm.isPalindrom(myWord3));
		assertFalse(Algorithm.isPalindrom(myWord4));
		assertFalse(Algorithm.isPalindrom(myWord5));

	}

	@Test
	public void testQuickSort() {
        List<Integer> test = List.of(9, 2, 1, 9, 19, 12, 23, 11, 2);
        
        List<Integer> testB = new ArrayList<>();
        test.forEach(testB::add);

        List<Integer> expected = List.of(1, 2, 2, 9, 9, 11, 12, 19, 23);
        
        List<Integer> expectedResult = new ArrayList<>();
        expected.forEach(expectedResult::add);

        List<Integer> result = Algorithm.quickSort(testB);

        assertEquals(expectedResult, result);

	}
	
	@Test
	public void testInPlaceQuickSort() {
        List<Integer> test = List.of(9, 2, 1, 9, 19, 12, 23, 11, 2);
        
        List<Integer> testB = new ArrayList<>();
        test.forEach(testB::add);

        List<Integer> expected = List.of(1, 2, 2, 9, 9, 11, 12, 19, 23);
        
        List<Integer> expectedResult = new ArrayList<>();
        expected.forEach(expectedResult::add);

        Algorithm.inPlaceQuickSort(testB);


        assertEquals(expectedResult, testB);


	}

}
