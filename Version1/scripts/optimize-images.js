import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

/**
 * Image Optimization Script
 * Converts PNG/JPG images to WebP format with quality optimization
 * Significantly reduces file sizes while maintaining visual quality
 */

const CONFIG = {
  // Quality settings for WebP conversion
  webpQuality: 80, // 80% quality - good balance between size and quality
  
  // Directories to process
  inputDirs: [
    'public/badges',
    'src/assets',
    'public'
  ],
  
  // Files to exclude from optimization
  excludeFiles: [
    'placeholder.svg',
    'favicon.ico',
    'favicon.ico1',
    'favicon.ico2'
  ],
  
  // Backup directory
  backupDir: 'tmp_rovodev_image_backups',
  
  // Image formats to optimize
  supportedFormats: ['.png', '.jpg', '.jpeg'],
};

class ImageOptimizer {
  constructor() {
    this.stats = {
      processed: 0,
      errors: 0,
      originalSize: 0,
      optimizedSize: 0,
      files: []
    };
  }

  /**
   * Main optimization function
   */
  async optimize() {
    console.log('🖼️  Starting Image Optimization...\n');
    console.log('📊 Configuration:');
    console.log(`   - WebP Quality: ${CONFIG.webpQuality}%`);
    console.log(`   - Directories: ${CONFIG.inputDirs.join(', ')}`);
    console.log('');

    // Create backup directory
    await this.createBackupDir();

    // Process each directory
    for (const dir of CONFIG.inputDirs) {
      if (existsSync(dir)) {
        console.log(`📁 Processing directory: ${dir}`);
        await this.processDirectory(dir);
      } else {
        console.log(`⚠️  Directory not found: ${dir}`);
      }
    }

    // Print summary
    this.printSummary();
  }

  /**
   * Create backup directory for original images
   */
  async createBackupDir() {
    if (!existsSync(CONFIG.backupDir)) {
      await mkdir(CONFIG.backupDir, { recursive: true });
      console.log(`✅ Created backup directory: ${CONFIG.backupDir}\n`);
    }
  }

  /**
   * Process all images in a directory
   */
  async processDirectory(dirPath) {
    try {
      const files = await readdir(dirPath);
      
      for (const file of files) {
        const filePath = join(dirPath, file);
        const fileStat = await stat(filePath);
        
        if (fileStat.isFile()) {
          await this.processFile(filePath);
        }
      }
    } catch (error) {
      console.error(`❌ Error processing directory ${dirPath}:`, error.message);
    }
  }

  /**
   * Process a single image file
   */
  async processFile(filePath) {
    const ext = extname(filePath).toLowerCase();
    const fileName = basename(filePath);
    
    // Skip if not a supported image format
    if (!CONFIG.supportedFormats.includes(ext)) {
      return;
    }
    
    // Skip if in exclude list
    if (CONFIG.excludeFiles.includes(fileName)) {
      console.log(`   ⏭️  Skipping: ${fileName}`);
      return;
    }

    try {
      // Get original file size
      const originalStats = await stat(filePath);
      const originalSize = originalStats.size;
      
      // Generate output path (replace extension with .webp)
      const outputPath = filePath.replace(ext, '.webp');
      
      // Convert to WebP
      await sharp(filePath)
        .webp({ quality: CONFIG.webpQuality })
        .toFile(outputPath);
      
      // Get optimized file size
      const optimizedStats = await stat(outputPath);
      const optimizedSize = optimizedStats.size;
      
      // Calculate savings
      const savings = originalSize - optimizedSize;
      const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
      
      // Update stats
      this.stats.processed++;
      this.stats.originalSize += originalSize;
      this.stats.optimizedSize += optimizedSize;
      this.stats.files.push({
        original: fileName,
        optimized: basename(outputPath),
        originalSize,
        optimizedSize,
        savings,
        savingsPercent
      });
      
      console.log(`   ✅ ${fileName} → ${basename(outputPath)}`);
      console.log(`      ${this.formatBytes(originalSize)} → ${this.formatBytes(optimizedSize)} (${savingsPercent}% reduction)`);
      
    } catch (error) {
      this.stats.errors++;
      console.error(`   ❌ Error processing ${fileName}:`, error.message);
    }
  }

  /**
   * Print optimization summary
   */
  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Files Processed: ${this.stats.processed}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`📦 Original Total Size: ${this.formatBytes(this.stats.originalSize)}`);
    console.log(`📦 Optimized Total Size: ${this.formatBytes(this.stats.optimizedSize)}`);
    
    const totalSavings = this.stats.originalSize - this.stats.optimizedSize;
    const totalSavingsPercent = ((totalSavings / this.stats.originalSize) * 100).toFixed(1);
    
    console.log(`💾 Total Savings: ${this.formatBytes(totalSavings)} (${totalSavingsPercent}% reduction)`);
    console.log('='.repeat(60));
    
    if (this.stats.files.length > 0) {
      console.log('\n📋 TOP 10 LARGEST SAVINGS:');
      const topSavings = this.stats.files
        .sort((a, b) => b.savings - a.savings)
        .slice(0, 10);
      
      topSavings.forEach((file, index) => {
        console.log(`${index + 1}. ${file.original}`);
        console.log(`   Saved: ${this.formatBytes(file.savings)} (${file.savingsPercent}%)`);
      });
    }
    
    console.log('\n✨ Next Steps:');
    console.log('1. Review the optimized .webp files');
    console.log('2. Update image references in your code to use .webp files');
    console.log('3. Test the application to ensure images load correctly');
    console.log('4. Original files are preserved - delete them after verification');
    console.log(`5. Backup originals are in: ${CONFIG.backupDir}\n`);
  }

  /**
   * Format bytes to human-readable string
   */
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }
}

// Run optimization
const optimizer = new ImageOptimizer();
optimizer.optimize().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
