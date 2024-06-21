package com.example.greenguardian

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.fragment.app.Fragment
import com.example.greenguardian.databinding.FragmentScanBinding
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

class ScanFragment : Fragment() {

    private var _binding: FragmentScanBinding? = null
    private val binding get() = _binding!!

    private val PICK_IMAGE_REQUEST = 1
    private var imageUri: Uri? = null

    val auth = Firebase.auth
    val user = auth.currentUser

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentScanBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (user != null) {
            val userName = user.displayName?.split(" ")?.get(0) ?: "User"
            binding.name.text = "Hi, " + userName+ "  \uD83D\uDC4B"
        } else {

        }

        binding.dropzone.setOnClickListener {
            openGallery()
        }

        binding.removeImageIcon.setOnClickListener {
            removeImage()
        }
    }

    private fun openGallery() {
        val intent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
        startActivityForResult(intent, PICK_IMAGE_REQUEST)
    }

    private fun removeImage() {
        binding.imagePreview.setImageURI(null)
        binding.imagePreview.visibility = View.GONE
        binding.removeImageIcon.visibility = View.INVISIBLE
        binding.cameraIcon.visibility = View.VISIBLE
        binding.textView.visibility = View.VISIBLE
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == Activity.RESULT_OK) {
            data?.data?.let {
                imageUri = it
                displayImage()
            } ?: run {
                Toast.makeText(requireContext(), "Failed to load image", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun displayImage() {
        imageUri?.let {
            binding.imagePreview.setImageURI(it)
            binding.imagePreview.visibility = View.VISIBLE
            binding.removeImageIcon.visibility = View.VISIBLE
            binding.cameraIcon.visibility = View.GONE
            binding.textView.visibility = View.GONE
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}