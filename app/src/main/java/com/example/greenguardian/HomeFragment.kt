package com.example.greenguardian

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.greenguardian.databinding.FragmentHomeBinding
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

// TODO: Rename parameter arguments, choose names that match
// the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
private const val ARG_PARAM1 = "param1"
private const val ARG_PARAM2 = "param2"

/**
 * A simple [Fragment] subclass.
 * Use the [HomeFragment.newInstance] factory method to
 * create an instance of this fragment.
 */
class HomeFragment : Fragment() {
    private var _binding: FragmentHomeBinding? = null
    private val binding get() = _binding!!

    val auth = Firebase.auth
    val user = auth.currentUser

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHomeBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (user != null) {
            val userName = user.displayName?.split(" ")?.get(0) ?: "User"
            binding.name.text = "Hi, " + userName+ "  \uD83D\uDC4B"
        } else {

        }

        binding.analyzeButton.root.setOnClickListener {
            parentFragmentManager.beginTransaction()
                .replace(R.id.fragment_container, ScanFragment())
                .addToBackStack(null)
                .commit()
        }

        // Set up RecyclerView
        val articlesAdapter = ArticlesAdapter(getArticlesList())
        binding.articlesRecyclerView.layoutManager = LinearLayoutManager(context)
        binding.articlesRecyclerView.adapter = articlesAdapter
    }


    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }

    private fun getArticlesList(): List<Article> {
        // Dummy data, replace with real data fetching logic
        return listOf(
            Article("Article 1", "Description 1"),
            Article("Article 2", "Description 2"),
            Article("Article 3", "Description 3"),
            Article("Article 3", "Description 3"),
            Article("Article 3", "Description 3")
        )
    }
}